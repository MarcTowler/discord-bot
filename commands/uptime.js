const Discord = require("discord.js");
const countdown = require('countdown');
const bootTime = new Date();

module.exports.run = async(bot, message, args) => {
    return message.channel.send(`I have been up since ${bootTime.toUTCString()} for a total of: ${countdown(bootTime)}`);
}

module.exports.help = {
    name: "uptime",
    triggers: "uptime",
    description: "Know how long the bot has been working without a break"
}