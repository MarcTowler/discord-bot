const Command = require("../base/Command.js");
const { version } = require("discord.js");

class invite extends Command {
    constructor(client) {
        super(client, {
            name: "Invite",
            usage: "invite",
            description: "Invite a user to Guilded",
            role: "Clan Council"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        args[0] = (args[0].substr(0, 2) === '<@') ? message.mentions.members.first().user.username : args[0];
        let id = message.mentions.members.first().user.id;
        message.delete().catch(O_o => {
        });
        return bot.users.get(id).send("Please click the link and log into Guilded using your existing Discord details http://www.guilded.gg/i/WknNGv4k");
    }
}

module.exports = invite;