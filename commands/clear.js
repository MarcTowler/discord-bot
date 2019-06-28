const Command = require("../base/Command.js");

class Clear extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            description: "Clears the specified number of messages, limit is 100",
            category: "Moderation",
            usage: "clear <Message Quantity>",
            guildOnly: true,
            aliases: [],
            permLevel: "Clan Council"
        });
    }

    async run(message, args, level) {
      let real = Number(args[0]) + 1;
      
        if (!args[0]) {
            return message.channel.send(`Try again: \`!${this.help.usage}\``);
        }

        if (args[0] > 99) {
            return message.channel.send("The Limit for this command is 100, try again");
        }
        message.channel.bulkDelete(real).then(() => {
            message.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete(4000));
        });
    }
}

module.exports = Clear;