const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send('Please click the following link - https://goo.gl/TqDv6d');
}

module.exports.help = {
    name: "Request an Event",
    triggers: "eventrequest",
    description: `Request an event to be run for you by the Officers`
}
