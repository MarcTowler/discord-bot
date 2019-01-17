const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if(args.length < 4)
    {
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

module.exports.help = {
    name: "Suggestions",
    triggers: "suggest",
    description: "Make a suggestion with !suggest <SUGGESTION HERE>",
    role: "everyone"
}