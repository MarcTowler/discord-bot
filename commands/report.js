const Command = require("../base/Command.js");
const { version } = require("discord.js");

class report extends Command {
    constructor(client) {
        super(client, {
            name: "Report User",
            usage: "report",
            description: "Report a user",
            role: "Officer"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!rUser) {
            return message.channel.send("Could not find user!");
        }

        let rReason = args.join(" ").slice(22);
        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Reports")
            .setColor("#15f153")
            .addField("Reported User", `${rUser} with ID: ${rUser.id}`);

        let reportsChannel = message.guild.channels.find(`name`, "moderation-test");
        if (!reportsChannel) return message.channel.send("Unable to find channel");
        message.delete().catch(O_o => {
        });

        reportsChannel.send(reportEmbed);
    }
}

module.exports = report;