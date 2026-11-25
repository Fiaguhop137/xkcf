async function boot(){
    const body=document.getElementById("body");
    try{
        const firebase=await import("./firebase.js");
        const core=await import("./core.js");
        firebase.load();
        core.init();
    }catch(error){
        console.error("Boot error:",error);
        if(body){body.innerHTML=`<p style="color:var(--pink);"><strong>Script error:</strong> ${error.message}</p>`;};
    };
};
boot();
