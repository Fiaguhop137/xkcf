const stories=[
    {
        title:"Please help me",
        author:"The Black Hat Wearer",
        content:"The dev wants me to make a story so they can check if their code works. I said no because I was busy, so the dev stole my hat and threw it into the basement. When I ran into the basement to get my hat, the dev locked the door and won’t let me out until I submit a story. This story is a call for help. Please, save me from the dev."
    },
    {
        title:"TimmyTime™! Ch. 65",
        author:"The Black Hat Wearers",
        content:"It’s TimmyTime™!\nAfter feeding Cat Prime to the sirens, Andromeda and the remaining Wills continue sailing and eventually reach the Land of the Dead\nThey are able to walk a little bit towards the area where the dead people are, but when one of the Wills crosses a certain point he instantly turns into cheese\nA message appears over his corpse, saying Andromeda needs to sacrifice the smallest sheep she can find in order to make it across the cheese threshold alive\n“Wait. Let’s think about this reasonably—” bleats Elmer as Andromeda pulls out her cannon and turns to face him\nKABOOM!\nTHAT’S NOT HOW YOU COOK MEAT, ANDROMEDA\nThe narrators accept the sacrifice and let Andromeda and the remaining Wills pass cheese-free\nThey see a bunch of ghostly-looking figures, including the seer they came to meet as well as several familiar faces\nNotably, they see Andromeda’s Uncle Hoort as well as both Bill the sheep and Elmer the sheep\n“You sacrificed your Uncle Hoort,” moans Uncle Hoort\n“You killed my sheep! My favorite sheep!” bleats Elmer. “His name was Bill and he was a composer of great music!”\n“You killed my sheep! My favorite sheep!” growls (do sheep growl?”) Bill. “His name was Elmer and he was an amazing actor!”\nThe three of them gang up on Andromeda and begin attacking her\nWhy are all the sheep involved with the arts\nShe tries to cannonball them but it goes straight through their ghostly bodies and hits a guy in the distance\nThe force of the cannonball makes Sisyphus lose his grip on the rock and it rolls down to the bottom of the hill. He starts swearing and runs at Andromeda\nBy the time he makes it there, Andromeda has already been beaten to death by the shades and is growing a sixtacle\nSisyphus tries to kill the Wills instead, but after he takes out a couple the rest start running away\nSisyphus chases after them but crosses the boundary to the living realm and is turned into cheese\nUpon seeing this, the remaining shades are afraid and leave Andromeda alone\nThe seer Tiresias, who they came to the land of the dead to see, walks up to Andromeda and begins to talk to her\n“Those Wills are total jerks, right?” he says\n“Yeah,” says Andromeda. “They keep doing crude things like stabbing cyclopes in the dick, they’re cowardly and no use in battle, and they’ve even tried to betray me a couple times.”\n“What if I told you there was a way to get them all killed?” says Tiresias. “Simply get them to eat the cattle of Helios, and you’ll make it to the 11th floor just fine but they’ll all die!”\n“Great!” exclaims Andromeda and returns to the ship. “We’re going back to Ithaca, Wills!” she yells. “And we’re stopping by the Isle of Helios on the way!”\nThis concludes Chapter 65 out of 677 of The Adventures of Timmy, Destroyer of Worlds™.\nChapter 66 should release on Wednesday at 6:07."
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
