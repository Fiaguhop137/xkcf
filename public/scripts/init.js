import * as firebase from './firebase.js';
import { doc,setDoc,getDoc } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
const [app,analytics,database]=firebase.load();
async function test(){
    const reference=doc(database,"test","hello-world");
    await setDoc(reference,{message:"hello world"});
    console.log("Written!");
    const snapshot=await getDoc(reference);
    if(snapshot.exists()){console.log("Read:",snapshot.data().message);}
    else{console.log("Document doesn't exist!");}
}
test().catch(console.error);