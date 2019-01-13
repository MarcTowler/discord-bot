const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    args[0] = (args[0].substr(0,2) === '<@') ? message.mentions.members.first().user.username : args[0];
    let id = message.mentions.members.first().user.id;
    message.delete().catch(O_o=>{});
    return bot.users.get(id).send("Please click the link and log into Guilded using your existing Discord details http://www.guilded.gg/i/WknNGv4k");
}

module.exports.help = {
    name: "Invite",
    triggers: "invite",
    description: "Invite a user to Guilded",
    role: "Clan Council"
}