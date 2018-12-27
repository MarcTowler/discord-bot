const Discord = require("discord.js");
const fortune = require('fortune-tweetable');

module.exports.run = async(bot, message, args) => {
    return message.channel.send(fortune.fortune());
}

module.exports.help = {
    name: "fortune",
    triggers: "fortune",
    description: "Get a fortune cookie quote"
}