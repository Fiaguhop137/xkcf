import * as firebase from './firebase.js';
import * as core from './core.js';
const [app,database]=firebase.load();
async function test(){
    const id=await firebase.write("posts",{title:"Hello world",content:"My first post!",createdAt:firebase.getTimestamp()});
    console.log("Created post:",id);
    const result=await firebase.read("posts/"+id);
    console.log("Read:",result);
    try{
        const page=await firebase.getReadable("posts");
        console.log("First page:",page.items);
    }catch(error){
        console.error("Failed to get readable posts:",error);
    }
    if(page.nextCursor){
        const next=await firebase.getReadable("posts",20,page.nextCursor);
        console.log("Second page:",next.items);
    }
};
core.init();
// test().catch(console.error);
