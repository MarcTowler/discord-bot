const Command = require("../base/Command.js");

class Invite extends Command {
    constructor(client) {
        super(client, {
            name: "invite",
            description: "Provide a new user the Guilded invite link.",
            category: "Clan",
            usage: "invite <@user>",
            guildOnly: true,
            aliases: [],
            permLevel: "Clan Council"
        });
    }

    async run(message, args, level) {
        args[0] = (args[0].substr(0, 2) === '<@') ? message.mentions.members.first().user.username : args[0];
        let id = message.mentions.members.first().user.id;
        message.delete().catch(O_o => {
        });
        return this.client.users.get(id).send("Please click the link and log into Guilded using your existing Discord details http://www.guilded.gg/i/WknNGv4k")
            .then(message.reply(`I have sent an invite to ${args[0]}`));
    }
}

module.exports = Invite;