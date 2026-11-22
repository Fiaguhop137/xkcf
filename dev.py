#!/usr/bin/env python3
import requests,json,re,subprocess
import tree_sitter_javascript as tsjs
from tree_sitter import Language,Parser
PROJECT_ID="xkcf-db-1f89a"
BASE=f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents"
STORIES_FILE="/home/firebot/git/xkcf/public/scripts/stories.js"
parser=Parser(Language(tsjs.language()))
def delete_document(collection,document_id):
    response=requests.delete(f"{BASE}/{collection}/{document_id}")
    response.raise_for_status()
    print(f"Deleted {document_id}")
def find_stories(root,source_bytes):
    def search(node):
        if node.type=="lexical_declaration":
            declaration=source_bytes[node.start_byte:node.end_byte].decode()
            if declaration.lstrip().startswith("const stories"):
                for child in node.children:
                    if child.type=="variable_declarator":
                        for item in child.children:
                            if item.type=="array":return item
        for child in node.children:
            result=search(child)
            if result:return result
        return None
    return search(root)
def get_array(source_bytes):
    tree=parser.parse(source_bytes)
    if tree.root_node.has_error:raise ValueError("stories.js contains invalid JavaScript")
    array=find_stories(tree.root_node,source_bytes)
    if array is None:raise ValueError("Could not find const stories array")
    return array
def normalize_source(source):
    source_bytes=source.encode("utf-8")
    array=get_array(source_bytes)
    elements=[child for child in array.named_children if child.type!="comment"]
    replacements=[]
    for previous,current in zip(elements,elements[1:]):
        gap=source_bytes[previous.end_byte:current.start_byte]
        if re.fullmatch(rb"\s*,\s*",gap):
            line_start=source_bytes.rfind(b"\n",0,current.start_byte)+1
            indent=source_bytes[line_start:current.start_byte]
            replacements.append((previous.end_byte,current.start_byte,b",\n"+indent))
    for start,end,replacement in reversed(replacements):
        source_bytes=(source_bytes[:start]+replacement+source_bytes[end:])
    updated=source_bytes.decode("utf-8")
    if parser.parse(source_bytes).root_node.has_error:raise ValueError("Failed to normalize stories.js")
    return updated
def load_source():
    with open(STORIES_FILE,encoding="utf-8") as file:
        return normalize_source(file.read())
def serialize_story(story):
    return(
        "    {\n"
       f"        title:{json.dumps(story['title'],ensure_ascii=False)},\n"
       f"        author:{json.dumps(story['author'],ensure_ascii=False)},\n"
       f"        content:{json.dumps(story['content'],ensure_ascii=False)}\n"
        "    }"
    )
def insert_story(source,story):
    source=normalize_source(source)
    source_bytes=source.encode("utf-8")
    array=get_array(source_bytes)
    elements=[child for child in array.named_children if child.type!="comment"]
    serialized=serialize_story(story).encode("utf-8")
    if elements:
        last=elements[-1]
        tail=source_bytes[last.end_byte:array.end_byte-1]
        trailing_comma=tail.find(b",")
        if trailing_comma!=-1:
            insert_at=last.end_byte+trailing_comma+1
            insertion=b"\n"+serialized
        else:
            insert_at=last.end_byte
            insertion=b",\n"+serialized
    else:
        insert_at=array.start_byte+1
        insertion=b"\n"+serialized+b"\n"
    updated=(source_bytes[:insert_at]+insertion+source_bytes[insert_at:])
    if parser.parse(updated).root_node.has_error:
        raise ValueError("Generated JavaScript is invalid; file not modified")
    with open(STORIES_FILE,"wb") as file:
        file.write(updated)
    return updated.decode("utf-8")
response=requests.get(f"{BASE}/stories")
response.raise_for_status()
documents=response.json().get("documents",[])
source=load_source()
with open(STORIES_FILE,"w",encoding="utf-8") as file:
    file.write(source)
for document in documents:
    document_id=document["name"].split("/")[-1]
    fields=document["fields"]
    author=fields["author"]["stringValue"]
    title=fields["title"]["stringValue"]
    content=fields["content"]["stringValue"]
    created_at=fields["createdAt"]["timestampValue"]
    print(f"{title}, by {author}, created at {created_at}:\n{content}\n")
    if input("Add to website? (y/n): ").strip().lower()!="y":
        continue
    story={"title":title,"author":author,"content":content}
    try:
        source=insert_story(source,story)
        print(f"Added {title} to stories.js")
    except Exception as error:
        print(f"Failed to update stories.js: {error}")
        continue
    try:
        delete_document("stories",document_id)
    except requests.RequestException as error:
        print(f"WARNING: Firestore deletion failed: {error}")
subprocess.run(["git","sync"])
subprocess.run(["firebase","deploy","--only","hosting:xkcf-1f89a"])
