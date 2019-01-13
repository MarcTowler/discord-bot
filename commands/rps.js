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
        message.channel.send(`It seems that something has gone wrong, <@131526937364529152> has been notified and is looking into it.`);
        message.guild.fetchMember('131526937364529152').then(user => {user.send(`A new error has occured in ${message.channel.name} caused by ${message.author.username}` +
            ` using !${this.help.triggers} ${args}.\n The Error was ${err.message}`)});
    });
};

module.exports.help = {
    name: "Rock Paper Scissors",
    triggers: "rps",
    description: "A good old fashioned game of Rock, Paper, Scissors, play by using !rps <rock/paper/scissors>",
    role: "everyone"
};