const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS"))
    {
        return message.reply("Git Gud Scrub");
    }

    if(!args[0])
    {
        return message.channel.send("You need to tell me how many messages to delete!");
    }

    if(args[0] > 100)
    {
        return message.channel.send("The Limit for this command is 100, try again");
    }
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete(4000));
    });
};

module.exports.help = {
    name: "Clear Messages",
    triggers: "clear",
    description: `Removes the specified number of messages. COmmand usage !${this.triggers} <number of messages>`
};