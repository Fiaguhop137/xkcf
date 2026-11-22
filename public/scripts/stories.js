const stories=[
    {
        title:"idk first story",
        author:"The dev",
        content:"Once upon a time, there was a little bob named Robert;DROP TABLE Students;--. The end. The moral of the story is: sanitize your inputs."
    }
];
export function loadStory(index){
    const titleDiv=document.getElementById("title");
    const authorDiv=document.getElementById("author");
    const storyContentDiv=document.getElementById("storyContent");
    titleDiv.textContent=stories[index].title;
    authorDiv.textContent=`by ${stories[index].author}`;
    storyContentDiv.innerHTML=stories[index].content;
}