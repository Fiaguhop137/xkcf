const stories=[
    {
        title:"Please help me",
        author:"The Black Hat Wearer",
        content:"The dev wants me to make a story so they can check if their code works. I said no because I was busy, so the dev stole my hat and threw it into the basement. When I ran into the basement to get my hat, the dev locked the door and won’t let me out until I submit a story. This story is a call for help. Please, save me from the dev."
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
