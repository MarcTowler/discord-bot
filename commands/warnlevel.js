const Discord = require("discord.js");

const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS"))
    {
        return message.reply("You don't have permission for this command");
    }

    let warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!warnUser)
    {
        return message.reply("Unable to find the user!");
    }

    let warnLevel = warns[warnUser.id].warns;

    message.reply(`<@${warnUser.id}> has ${warnLevel} warnings`);
}

module.exports.help = {
    name: "warnlevel",
    role: "Officer"
}