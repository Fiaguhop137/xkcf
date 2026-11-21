import * as firebase from './firebase.js';
import * as utils from './utils.js';
import * as core from './core.js';
const [app,analytics,database]=firebase.load();
async function test(){
    const id=await firebase.write("posts",{title:"Hello world",content:"My first post!",createdAt:firebase.getTimestamp()});
    console.log("Created post:",id);
    const result=await firebase.read("posts/"+id);
    console.log("Read:",result);
    const page=await firebase.getReadable("posts");
    console.log("First page:",page.items);
    if(page.nextCursor){
        const next=await firebase.getReadable("posts",20,page.nextCursor);
        console.log("Second page:",next.items);
    }
};
core.init();
// test().catch(console.error);
