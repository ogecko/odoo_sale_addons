const sampleMessages = {
    Birthday: [
		"A belated birthday bouquet for you my friend. i hope you had a wonder day.",
		"Birthday wishes, we hope you have a great birthday, much love.",
		"Happiest of Birthdays to our dearest friend. We wish you lots of joy this year ahead and hope to share many laughs and memories with you. This is our small reminder that we love you and cherish our friendship with you. Happy Birthday",
		"Happy (belated) birthday",
		"Happy belated Birthday to a special girl!  Let the birthday celebrations continue all week xxx",
		"Happy birthday beautiful!",
		"Happy Birthday for tomorrow, sorry I can't be there xxx",
		"Happy Birthday Gorgeous! Hope you have a fab day, wish i was there! Can't wait to see you soon! Love you Lots!",
		"Happy birthday man! Hope you get spoilt and have a brilliant day! Lots of love.",
		"Happy Birthday, and wishing you peace and contentment and grace.",
		"Happy Birthday!  I hope you have a wonderful day and can get out and enjoy the sunshine.",
		"Happy Birthday! Enjoy your celebrations and have a sweet Birthday! Hope all your wishes come true this year xxx",
		"Happy Birthday! Hope you have a wonderful day!",
		"Happy Birthday! You deserve all the happiness in the world. Xx",
		"Happy Birthday!",
		"Hoping the sun is shining for your birthday today :) May your day be filled with laughter, love and cake!!!",
		"Lots of birthday love from all of us!",
		"Lots of love xx",
		"Lots of love",
		"Wishing you a very happy birthday.",
		"XX Can't wait to see you",
        "Wishing you a wonderful birthday filled with flowers, hugs and laughter. May the coming year bless you with prosperity, good health and happiness. ",
        "Wishing you the happiest of birthdays. Always thinking of you.",
    ], 
    Anniversary: [
		"Happy Anniversary!",
		"Happy Anniversary.  Can you believe that you have been in this building for so many years with me. xxx",
		"Mazeltov on your first year wedding anniversary. Love you lots xx",
		"Bon Anniversaire! With Love",
		"Happy 1st Anniversary love birds xxx",
		"Happy 5 years Anniversary! Je t'aime Ã  la folie. ",
		"Happy 10th Anniversary xxx ",
		"Happy 20th Anniversary xxx ",
		"Happy 50th Anniversary XX. Lots of love xxx",
		"Happy Anniversary babe xx I love you more each day and i couldn't imagine my life without you xx",
		"Happy Anniversary, Love you so much and am very lucky to have found you.",
		"Happy anniversary guys! Thanks for the stable upbringing and for your never-ending love and support xxx",
		"Happy Anniversary my love",
		"Happy Anniversary Sweets, I am so lucky to have you in my life. With all my love xx",
		"Happy Anniversary! I love you!",
		"Happy Anniversary. My Good Thing is that I'm grateful you're with me.",
		"Happy Wedding Anniversary, love you both xx ",
    ],
    Thanks: [
		"A little something for you to say thank you for all that you have done for me and for being such a beautiful person.",
		"All the best. Thanks.",
		"I just wanted to say thank you for all your support, patience and flexibility over the last 6 months. You've made a difficult time so much easier.",
		"I will miss you so very much.",
		"Thank you for all your help. We will miss you so much.",
		"Thank you for being the beautiful person you are xxx ",
		"Thank you for everything you do for me. Love ya",
		"Thank you for everything! I have loved working with you and will miss you very much.  xox",
		"Thank you for everything!",
		"Thank you for everything. Amazing year.",
		"Thank you for everything. I'll miss you.",
		"Thank you so much for my new Escape Bag - it is fabulous and I love it!",
		"Thank you xx",
		"Thank You!",
		"Thanks for all your efforts, cakes, treats and laughs.",
		"Thanks for all your time and effort!",
		"Thanks for being such a wonderful friend. Lots of love x",
		"Thanks for tolerating me. Love you.",
        "A million thank yous for the last few days - I would not have survived without you!",
        "Thank you for everything you do for us! Love you xoxo",
    ],
    Congrats: [
		"A huge congratulations on the arrival of your new baby. We hope for a fast recovery and a beautiful start to a new journey with your little one, enjoy every min. God bless",
		"A huge congratulations to you both. Know its been a tough few months but so so pleased about the new arrival",
		"A little birdie told me that a special delivery had arrived!  Congratulations to you both.  We hope your beautiful baby brings you much joy in your new family xo",
		"Biggest love and congratulations to the next, better chapter my darling. Love you so much!",
		"Congraduations!!!",
		"Congrats. You will probably think these flowers are cheesy and feel slightly uncomfortable. So my job is done.",
		"Congratulations baby, I'm so proud of you! xxxx",
		"Congratulations lovely xx",
		"Congratulations on your engagement!",
		"Such an exciting day for you and such an exciting year too. Love you  long time.",
		"We watch on in awe ... you did an amazing job last night. Congrats!",
    ],
    Sorry: [
		"Break a leg! :) sorry I'm not there to cheer you on, and missing you heaps xx",
		"Hello darling, I'm sorry we haven't caught up. I want you to know I'm thinking of you and I'll give you a call soon. X",
		"I am so sorry to hear the sad news. Thinking of you and sending all my love to all the family xxx",
		"Just wanted to let you know we are thinking of you.  Sorry that you are fighting this battle, but we know you have got this - you're too fabulous not to win.  Sending  our love and best wishes always xx",
		"Love you xxx",
		"So sorry to hear about the sad news. Am sure he will forever watch over you and be in our hearts and on social media. :)",
		"Sorry about the mess in your shop this morning!",
		"Sorry I messed up",
		"Sorry about the mess in your shop this morning!",
		"Sorry I was sick and couldn't come yesterday.",
		"Sorry xx",
		"Very sorry for your loss, thoughts are with you and your family.",
        "We are so sorry for your loss and  thinking of you and the family in this very difficult time.  All our love",
        "There is a saying that friends are the family we choose for ourselves and you are my family. I am so sorry you have been sad lately. You don't deserve it.  xxxxxx"
    ],
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export default function cardMessageSample(theme) {
    let id = theme;

    // if no matching theme then just choose one randomly
    if (!sampleMessages[id]) {
        const themes = Object.keys(sampleMessages);
        const numThemes = themes.length;
        id = themes[getRandomInt(numThemes)];
    }

    const numSamples = sampleMessages[id].length;
    return sampleMessages[id][getRandomInt(numSamples)];

}