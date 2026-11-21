export function init(){
    console.log("Initializing...");
    const body=document.getElementById("body");
    body.innerHTML="<input type='password' id='password' placeholder='Enter Password'/><button id='submit'>Submit</button>";
    const passwordInput=document.getElementById("password");
    const submitButton=document.getElementById("submit");
    submitButton.addEventListener("click",async()=>{submit();});
    document.addEventListener("keydown",async(event)=>{if(event.key==="Enter"){submit();}});
    async function submit(){
        const password=passwordInput.value;
        if(password===""){
            alert("Please enter a password.");
            return;
        };
        if(password!=="password123"){ //change this later lol
            alert("Incorrect password.");
            return;
        }
        else{body.innerHTML="<h2>Welcome!</h2><p>You have successfully logged in.</p>";};
    };
};
