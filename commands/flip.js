const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    https.get(`https://api.itslit.uk/games/cointoss/${message.member.displayName}/${args[0]}`, (resp) => {

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
    name: "Coin Toss",
    triggers: "flip",
    description: `A Coin Toss mini game, usage is !${this.triggers} <heads/tails>`
}