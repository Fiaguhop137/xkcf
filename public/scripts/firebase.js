// This code looks weird because i literally copied it from the firebase website. 
// I don't know what it does, but it works. Don't touch it
import {initializeApp} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import {getFirestore,doc,collection,getDoc,getDocs,addDoc,updateDoc,serverTimestamp,query,orderBy,limit,startAfter,documentId} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
const firebaseConfig={apiKey:"AIzaSyB3JQaanI_jrkMBj7AcNblkyW2Zrg7qZWk",authDomain:"xkcf-db-1f89a.firebaseapp.com",projectId:"xkcf-db-1f89a",storageBucket:"xkcf-db-1f89a.firebasestorage.app",messagingSenderId:"410642698460",appId:"1:410642698460:web:366bc5adde0a74872d6419",measurementId:"G-ZSQEBPPN75"};
// Again, no touchy. touchy bad.
let database;
export function load(){
    console.log("Firebase loading...");
    const app=initializeApp(firebaseConfig);
    const analytics=getAnalytics(app);
    database=getFirestore(app);
    console.log("Firebase loaded");
    return [app,analytics,database];
};
export function getTimestamp(){return serverTimestamp();};
export async function read(path){
    const snapshot=await getDoc(doc(database,path));
    return snapshot.exists()?{...snapshot.data(),id:snapshot.id}:null;
};
export async function write(path,data){
    const reference=await addDoc(collection(database,path),data);
    return reference.id;
};
export async function update(path,data){
    await updateDoc(doc(database,path),data);
};
export async function getReadable(path,pageSize=20,cursor=null){
    const constraints=[orderBy("createdAt","desc"),orderBy(documentId()),limit(pageSize)];
    if(cursor){constraints.push(startAfter(cursor));};
    const snapshot=await getDocs(query(collection(database,path),...constraints));
    return{
        items:snapshot.docs.map(item=>({...item.data(),id:item.id})),
        nextCursor:snapshot.docs.length===pageSize?snapshot.docs.at(-1):null
    };
};
