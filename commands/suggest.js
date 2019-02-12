const Command = require("../base/Command.js");

class Suggest extends Command {
    constructor(client) {
        super(client, {
            name: "suggest",
            description: "Add a suggestion to be voted on",
            category: "Clan",
            usage: "suggest <Suggestion>",
            guildOnly: true,
            aliases: ["suggstion"],
            permLevel: "User"
        });
    }

    async run(message, args, level) {
        if (args.length < 4) {
            return message.channel.send(`Sorry ${message.member.displayName} but a suggestion needs to form a sentence!`);
        }

        let REmbed = new Discord.RichEmbed()
            .setAuthor(`${message.member.displayName} suggested the following:`)
            .setColor(0x00ff00)
            .addField('Suggestion', args.join(" "))
            .addField('Voting', 'Please vote with yes (✅) or no (❎)');

        return message.guild.channels.get('497077179755003914').send(REmbed)
            .then(async (reactions) => {
                await reactions.react('✅');
                await reactions.react('❎');
            });
    }
}

module.exports = Suggest;