const Command = require("../base/Command.js");
const { version } = require("discord.js");

class suspend extends Command {
    constructor(client) {
        super(client, {
            name: "Suspend",
            usage: "suspend",
            description: "Strip a user of all their roles and add the Suspended Account to them, call again to reverse. Syntax is !suspend @USER",
            role: "Clan Council"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        if (message.member.roles.find('name', 'Clan Council')) {
            if (args.length === 1) return message.reply('The command is `!suspend @user REASON` and don\'t forget it');

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
}

module.exports = suspend;