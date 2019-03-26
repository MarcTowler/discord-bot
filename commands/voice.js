const Command = require("../base/Command.js");
const https = require('https');
const Discord = require('discord.js');

class voice extends Command {
    constructor(client) {
        super(client, {
            name: "voice",
            description: "Create and delete voice channels as well as invite user's to them",
            category: "Clan",
            usage: "voice create <Optional: list of usernames, tagged> OR voice delete OR voice invite @username",
            guildOnly: true,
            aliases: [],
            permLevel: "Officer"
        });
    }

    async run(message, args, level) {
        if(args.length > 0)
        {
            if(args[0].toLowerCase() === 'create')
            {
                message.guild.createChannel(`${message.member.displayName}'s fireteam`, 'voice')
                    .then(channel => {
                        message.member.addRole(message.member.guild.roles.find('name', 'FireTeamVOIP'));
                        deleteEmptyChannelAfterDelay(channel, message);
                        channel.setParent('370180211037175818')
                            .catch(error => console.log(error));
                    })
                    .catch(console.error);
            }
        }
    }

    
}

module.exports = voice;

function deleteEmptyChannelAfterDelay(voiceChannel, message, delayMS = 180000){
    if(!voiceChannel) return;
    if(voiceChannel.members.first()) return;
    if(!voiceChannel.health) voiceChannel.health = 0;
    voiceChannel.health += 1;
    setTimeout(function(){	//queue channel for deletion and wait
        if(!voiceChannel) return;
        if(voiceChannel.members.first()) return;
        voiceChannel.health -= 1;
        if(voiceChannel.health > 0) return;
        let role = message.guild.roles.find(t => t.name == 'FireTeamVOIP');
        message.guild.members.forEach(member => {
            if(!member.roles.find(t => t.name == 'FireTeamVOIP')) return;
            member.removeRole(role.id)
        });
        voiceChannel.delete()	//delete channel
            .catch(error => console.log(error));
    }, delayMS);
}