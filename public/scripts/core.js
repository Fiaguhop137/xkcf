import * as firebase from "./firebase.js";
export function init(){
    console.log("Initializing...");
    const body=document.getElementById("body");
    body.innerHTML=`
    <p>Welcome to XKCF! Please enter the password to continue. (this exists to block scrapers and as a very basic captcha)</p>
    <input type='password' id='password' placeholder='Enter Password'/>
    <p>hint: its not password123</p>
    <button id='submit'>Submit</button>
    `;
    const passwordInput=document.getElementById("password");
    const submitButton=document.getElementById("submit");
    submitButton.addEventListener("click",async()=>{submit();});
    passwordInput.addEventListener("keydown",async(event)=>{if(event.key==="Enter"){submit();}});
    async function submit(){
        const password=passwordInput.value;
        if(password===""){
            alert("Please enter a password.");
            return;
        };
        if(btoa(password)!=="cGFzc3dvcmQxMjM="){ //so secure. military level encryption. source: trust me bro
            alert("Incorrect password.");
            return;
        }else{
            body.innerHTML=`
                <h2>Welcome!</h2>
                <p>You have successfully logged in.</p>
                <input type="file" id="image" accept="image/*"/>
                <textarea id="post" rows="4" cols="50" placeholder="Type here..." style="resize:none;"></textarea>
                <input type="text" id="username" placeholder="ur name"/>
                <p>name is optional; leave blank for anon</p>
                <button id="postButton">Post</button>
                <button id="refreshButton">Refresh</button>
                <p>Posts will be displayed below:</p>
                <div id="posts"></div>
            `;
            const postButton=document.getElementById("postButton");
            const refreshButton=document.getElementById("refreshButton");
            postButton.addEventListener("click",post);
            refreshButton.addEventListener("click",async()=>{
                const page=await firebase.getReadable("posts");
                displayPosts(page.items,page.nextCursor);
            });
            const page=await firebase.getReadable("posts");
            displayPosts(page.items,page.nextCursor);
        };
    };
};
async function post(){
    const postInput=document.getElementById("post");
    const usernameInput=document.getElementById("username");
    if(usernameInput.value==""){
        usernameInput.value="Anonymous";
    };
    const username=usernameInput.value;
    const content=postInput.value;
    if(content===""){
        alert("Please enter some content.");
        return;
    };
    const imageInput=document.getElementById("image");
    let image=null;
    try{if(imageInput.files.length>0){image=await firebase.imageToBase64(imageInput.files[0]);};}
    catch(error){
        console.error("Image upload failed:",error);
        alert(error.message);
        return;
    };
    console.log("Posting content:",content);
    console.log("Username:",username);
    image?console.log("Image:",image):console.log("No image uploaded");
    let id_try;
    try{
        id_try=await firebase.write("posts",{content:content,author:username,createdAt:firebase.getTimestamp(),image:image});
    }catch(error){
        console.error("Failed to create post:",error);
        alert("Failed to post. Please try again.");
        return;
    };
    const id=id_try?id_try:"unknown";
    console.log("Created post:",id);
    postInput.value="";
    imageInput.value="";
    const page=await firebase.getReadable("posts");
    displayPosts(page.items,page.nextCursor);
};
export function addPost(post){
    const postsDiv=document.getElementById("posts");
    const postDiv=document.createElement("div");
    postDiv.className="post";
    if(post.author){
        const author=document.createElement("strong");
        author.textContent=post.author;
        postDiv.append(author,document.createElement("br"));
    };
    if(post.image){
        const image=document.createElement("img");
        image.src=post.image;
        image.style.maxWidth="100%";
        postDiv.appendChild(image);
    };
    const content=document.createElement("p");
    content.textContent=post.content;
    const timestamp=document.createElement("small");
    const dateStr=post.createdAt?new Date(post.createdAt.seconds*1000).toLocaleString():"Just now";
    timestamp.textContent=`Posted at: ${dateStr}`;
    postDiv.append(content,timestamp);
    postsDiv.appendChild(postDiv);
};
export function displayPosts(posts,nextCursor,append=false){
    const postsDiv=document.getElementById("posts");
    if(!append){postsDiv.innerHTML="";};
    posts.forEach(post=>{addPost(post);});
    const oldButton=document.getElementById("loadMore");
    if(oldButton){oldButton.remove();};
    if(nextCursor){
        const loadMoreButton=document.createElement("button");
        loadMoreButton.id="loadMore";
        loadMoreButton.innerText="Load More";
        loadMoreButton.addEventListener("click",async()=>{
            const page=await getPostsFromFirebase(nextCursor);
            displayPosts(page.items,page.nextCursor,true);
        });
        postsDiv.appendChild(loadMoreButton);
    };
};
export async function getPostsFromFirebase(cursor=null){
    return firebase.getReadable("posts",20,cursor);
};
