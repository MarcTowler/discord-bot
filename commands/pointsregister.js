const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {

    if(args.length !== 1)
    {
        return message.channel.send(`Something did not look right there ${message.member.displayName}, please read the description:\n ${this.help.description}`);
    }
    https.get(`https://api.itslit.uk/G4G/register/${message.member.displayName}/${args[0]}`, (resp) => {
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
}

module.exports.help = {
    name: "Points Registration",
    triggers: "pointsregister",
    description: `A way to link your discord with your Bungie username to be able to use !points, the syntax is !pointsregister <D2 Name>`,
    role: "everyone"
}