const Discord = require("discord.js");
const https = require('https');

module.exports.run = async(bot, message, args) => {
    if(args.length < 3)
    {
        return message.channel.send(this.help.description);
    }

    let allowedAcess = message.guild.roles.find("name", "Clan Council");
}

module.exports.help = {
    name: "Add Points",
    triggers: "addpoints",
    description: `Add points to a user in either the PvP or PvE ladders, the syntax is !${this.triggers} <Ladder Name> <Username> <amount>`
}