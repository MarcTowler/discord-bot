const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    https.get(`https://api.itslit.uk/games/roulette/${message.member.displayName}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            message.channel.send(data);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

module.exports.help = {
    name: "Roulette",
    triggers: "roulette",
    description: "A Russian Roulette mini game"
}