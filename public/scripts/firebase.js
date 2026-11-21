// This code looks weird because i literally copied it from the firebase website. 
// I don't know what it does, but it works. Don't touch it
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
// Again, no touchy. touchy bad.
const firebaseConfig={apiKey:"AIzaSyB3JQaanI_jrkMBj7AcNblkyW2Zrg7qZWk",authDomain:"xkcf-db-1f89a.firebaseapp.com",projectId:"xkcf-db-1f89a",storageBucket:"xkcf-db-1f89a.firebasestorage.app",messagingSenderId:"410642698460",appId:"1:410642698460:web:366bc5adde0a74872d6419",measurementId:"G-ZSQEBPPN75"};
export function load(){
    console.log("Firebase loading...");
    const app=initializeApp(firebaseConfig);
    const analytics=getAnalytics(app);
    const database=getFirestore(app);
    console.log("Firebase loaded");
    return [app,analytics,database];
}