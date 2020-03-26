const fs = require("fs");
const axios = require('axios');

const text = fs.readFileSync("./words.txt", "utf-8");
const wordArray = text.split("\n");
let uniq = [...new Set(wordArray)];

const startGenerating = async () => {
    let currentCard = [];
    for (let i = 0; i < 5; i++) {
        const index = getRandomInt(0, uniq.length);
        currentCard.push(uniq[index]);
        uniq.splice(index, 1);
    }
    await uploadCard(currentCard);
    console.log(currentCard);
    if (uniq.length >= 5)
        await startGenerating();
    else
        console.log("We don't have any words left anymore!");
};

const uploadCard = async (card) => {
    await axios.post("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/tracker-pxmwp/service/HTTP/incoming_webhook/add_card", {
        array: card
    });
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

startGenerating().then(() => console.log("Done with generating words!"));
