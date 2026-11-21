// This code looks weird because i literally copied it from the firebase website. 
// I don't know what it does, but it works. Don't touch it
import {initializeApp} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import {getFirestore,doc,collection,getDoc,getDocs,addDoc,updateDoc,serverTimestamp,query,orderBy,limit,startAfter,documentId} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
import {encode} from "https://esm.sh/@jsquash/avif@2.1.1";
const firebaseConfig={apiKey:"AIzaSyB3JQaanI_jrkMBj7AcNblkyW2Zrg7qZWk",authDomain:"xkcf-db-1f89a.firebaseapp.com",projectId:"xkcf-db-1f89a",storageBucket:"xkcf-db-1f89a.firebasestorage.app",messagingSenderId:"410642698460",appId:"1:410642698460:web:366bc5adde0a74872d6419",measurementId:"G-ZSQEBPPN75"};
// Okay everything after this is my code. I don't know what the above does, but it works. Don't touch it
let database;
export function load(){
    console.log("Firebase loading...");
    const app=initializeApp(firebaseConfig);
    database=getFirestore(app);
    console.log("Firebase loaded");
    return [app,database];
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
async function convertToAvif(file){
    const bitmap=await createImageBitmap(file);
    const canvas=document.createElement("canvas");
    canvas.width=bitmap.width;
    canvas.height=bitmap.height;
    const context=canvas.getContext("2d");
    context.drawImage(bitmap,0,0);
    bitmap.close();
    const imageData=context.getImageData(0,0,canvas.width,canvas.height);
    const encoded=await encode(imageData);
    return new Blob([encoded],{type:"image/avif"});
};
export async function imageToBase64(file){
    let converted=file;
    if(file.type!=="image/avif"){converted=await convertToAvif(file);};
    const b64_converted=await new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.onload=()=>resolve(reader.result);
        reader.onerror=()=>reject(reader.error);
        reader.readAsDataURL(converted);
    });
    if(b64_converted.length>1000000){throw new Error("Image exceeds the 1 MiB limit.");};
    return b64_converted;
};
