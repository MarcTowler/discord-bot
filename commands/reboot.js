const Command = require("../base/Command.js");

class Reboot extends Command {
    constructor (client) {
        super(client, {
            name: "reboot",
            description: "Shuts the bot down, if PM2 is running then it will cause it to be a restart.",
            category: "System",
            usage: "reboot",
            permLevel: "Bot Owner",
            aliases: []
        });
    }

    async run (message, args, level) { // eslint-disable-line no-unused-vars
        try {
            await message.reply("Bot is shutting down.");

            this.client.commands.forEach(async cmd => {
                await this.client.unloadCommand(cmd);
            });
            
            process.exit(1);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Reboot;