const Command = require("../base/Command.js");

class Suspend extends Command {
    constructor(client) {
        super(client, {
            name: "suspend",
            description: "Suspend a user",
            category: "Moderation",
            usage: "suspend <@user> <Reason>",
            guildOnly: true,
            aliases: [],
            permLevel: "Clan Council"
        });
    }

    async run(message, args, level) {
        if (args.length === 1) return message.reply(`The command is \`!${this.help.usage}\` and don't forget it`);

        //is it a tagged user or just a name
        let suspendMember = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
        //do they exist?
        if (!suspendMember) return message.reply(`Couldn't find ${args[0]}`);
        //find the suspended account role
        let suspendRole = message.guild.roles.find('name', 'Suspended Account');
        //remove all the roles
        await (suspendMember.removeRoles(suspendMember.roles.filter(role => role.name != 'Suspended Account')));
        //add suspended role
        await (suspendMember.addRole(suspendRole.id));
        //DM the user
        try {
            let shifted = args.slice(1).join(" ");
            await (message.channel.send(`You successfully suspended ${args[0]}, I sent them a DM to let them know it was because ${shifted}`));
            await (suspendMember.send(`You were suspended by ${message.member.displayName} for ${shifted}`));
        } catch (e) {
            message.channel.send(`${args[0]} was suspended, I tried to DM them but they blocked the message!`);
        }
    }
}

module.exports = Suspend;