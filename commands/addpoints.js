const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    if(args.length < 3)
    {
        return message.channel.send(this.help.description);
    }

    let allowedAccess = message.guild.roles.find("name", "Clan Council");

    if(allowedAccess === null)
    {
        return message.channel.send(`Sorry ${message.member.displayName} but you do not have sufficient permissions to add points`);
    }

    if(!message.member.roles.has(allowedAccess.id))
    {
        return message.channel.send(`Sorry ${message.member.displayName} but you do not have sufficient permissions to add points`);
    }

    https.get(`https://api.itslit.uk/G4G/add/${args[0]}/${args[1]}/${args[2]}/${message.member.displayName}`, (resp) => {
        let data = '';

        //a chunk of data has been received
        resp.on('data', (chunk) => {
            data += chunk;
        });

        //the whole response is here
        resp.on('end', () => {
            return message.channel.send(`${args[0]} points have been added to ${args[1]}'s ${args[2]} score`);
        });
    }).on("error", (err) => {
        console.log(`Error: ${err.message}`);

        return message.channel.send(`Error: ${err.message}`);
    });
}

module.exports.help = {
    name: "Add Points",
    triggers: "addpoints",
    description: `Add points to a user in either the PvP or PvE ladders, the syntax is !${this.triggers} <Ladder Name> <Username> <amount>`
}