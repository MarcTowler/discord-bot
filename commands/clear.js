const Command = require("../base/Command.js");
const { version } = require("discord.js");

class clear extends Command {
    constructor(client) {
        super(client, {
            name: "Clear Messages",
            usage: "clear",
            description: "Removes the specified number of messages from the channel it is called from. Command usage !clear <number of messages>",
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        if (message.guild.id === '220467406559117312') return;

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Git Gud Scrub");
        }

        if (!args[0]) {
            return message.channel.send("You need to tell me how many messages to delete!");
        }

        if (args[0] > 100) {
            return message.channel.send("The Limit for this command is 100, try again");
        }
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete(4000));
        });
    };
}

module.exports = clear;