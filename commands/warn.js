const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async(bot, message, args) => {
    //!warn @user <reason>
    if(!message.member.hasPermission("MANAGE_MEMBERS"))
    {
        return message.reply("You don't have permission for this command");
    }

    let warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!warnUser)
    {
        return message.reply("Unable to find the user!");
    }

    if(warnUser.hasPermission("MANAGE_MESSAGES"))
    {
        return message.reply("Unable to warn a mod+ role");
    }

    let reason = args.join(" ").split(22);

    if(!warns[warnUser.id])
    {
        warns[warnUser.id] = {
            warns: 0
        };
    }

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if(err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
        .setDescription("Warns")
        .setAuthor(message.author.username)
        .setColor("#fc6400")
        .addField("Warned User", `<@${warnUser.id}>`)
        .addField("Warned in", message.channel)
        .addField("Number of warnings", warns[warnUser.id].warns)
        .addField("Reason", reason);

    let warnChannel = message.guild.channels.find(`name`, "moderation-test");

    if(!warnChannel)
    {
        return message.reply("Unable to find channel");
    }

    warnChannel.send(warnEmbed);
}

module.exports.help = {
    name: "warn"
}