const stories=[
    {
        title:"Please help me",
        author:"The Black Hat Wearer",
        content:"The dev wants me to make a story so they can check if their code works. I said no because I was busy, so the dev stole my hat and threw it into the basement. When I ran into the basement to get my hat, the dev locked the door and won’t let me out until I submit a story. This story is a call for help. Please, save me from the dev."
    },
    {
        title:"Doctors hate this one weird trick!",
        author:"Ardera",
        content:"Note: In the following \"study\", no one statement is a lie. \nThere is a positive correlation with people who wear seatbelts and people who get cancer. This correlation can be extremely concerning. Correlation often can imply causation. It could be said therefore that wearing a seatbelt causes cancer. Following that logic, if one were to forego wearing seatbelts, the chance of contracting cancer would decrease. \n<button type=\"button\" onclick=\"const el=document.getElementById('secretText'); el.style.display=el.style.display==='none'?'block':'none';\">Show/Hide Answer</button>\n<p id=\"secretText\" style=\"display: none;\">\nSeatbelts prevent deaths in car crashes. Therefore, since the people who wear seatbelts live longer, they have a greater(>0%) chance of getting cancer, compared to those who died in car crashes(0%)\n</p>"
    }
];
export function loadStory(index){
    const titleDiv=document.getElementById("title");
    const authorDiv=document.getElementById("author");
    const storyContentDiv=document.getElementById("storyContent");
    titleDiv.textContent=stories[index].title;
    authorDiv.textContent=`by ${stories[index].author}`;
    storyContentDiv.innerHTML=stories[index].content;
};
export function count(){return stories.length;};
