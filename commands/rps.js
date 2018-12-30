const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    https.get(`https://api.itslit.uk/games/rpg/${args[0]}/${message.member.displayName}`, (resp) => {
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
    name: "Rock Paper Scissors",
    triggers: "rps",
    description: `A good old fashioned game of Rock, Paper, Scissors, play by using !${this.triggers} <rock/paper/scissors>`
}