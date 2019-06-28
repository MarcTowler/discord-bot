module.exports = class {
    constructor (client) {
      this.client = client;
    }
  
    async run (oldMember, newMember) {
        let newUserChannel = newMember.voiceChannel;
        let oldUserChannel = oldMember.voiceChannel;

        if(oldUserChannel === undefined && newUserChannel !== undefined)
        {
            if(newUserChannel.name == "Fireteam VOIP Creation")
            {
                for(const i of newUserChannel.members)
                {
                    for(const u of i)
                    {
                        let name = (u.nickname !== null) ? u.nickname : u.user['username'];

                        newUserChannel.guild.createChannel(`${name}'s fireteam`, 'voice')
                            .then(channel => {
                                deleteEmptyChannelAfterDelay(channel);
                                channel.setParent('370180211037175818')
                                //channel.setParent('580454132624785411')
                                    .catch(error => console.log(error));
                                    u.setVoiceChannel(channel);
                            })
                            .catch(console.error);
                    }
                }
            }
        } else if(newUserChannel === undefined) {
            if(oldUserChannel.members.size < 1)
            {
                if(oldUserChannel.name == "Hanging out" || oldUserChannel.name == "AFK" || oldUserChannel.name == "Fireteam VOIP Creation") return;
                oldUserChannel.delete("Fireteam is empty");
            }
        } else {
            if(newUserChannel.name == "Fireteam VOIP Creation")
            {
                for(const i of newUserChannel.members)
                {
                    for(const u of i)
                    {
                        let name = (u.nickname !== null) ? u.nickname : u.user['username'];

                        newUserChannel.guild.createChannel(`${name}'s fireteam`, 'voice')
                            .then(channel => {
                                deleteEmptyChannelAfterDelay(channel);
                                channel.setParent('370180211037175818')
                                //channel.setParent('580454132624785411')
                                    .catch(error => console.log(error));
                                    u.setVoiceChannel(channel);
                            })
                            .catch(console.error);
                    }
                }
            }

            if(oldUserChannel.members.size < 1)
            {
                if(oldUserChannel.name == "Hanging out" || oldUserChannel.name == "AFK" || oldUserChannel.name == "Fireteam VOIP Creation") return;
                oldUserChannel.delete("Fireteam is empty");
            }
        }
    }
};
function deleteEmptyChannelAfterDelay(voiceChannel, delayMS = 60000){
    console.log(voiceChannel);
    if(!voiceChannel) return;
    if(voiceChannel.members.first()) return;
    if(!voiceChannel.health) voiceChannel.health = 0;
    voiceChannel.health += 1;
    setTimeout(function(){	//queue channel for deletion and wait
        if(!voiceChannel) return;
        if(voiceChannel.members.first()) return;
        voiceChannel.health -= 1;
        if(voiceChannel.health > 0) return;
        
        voiceChannel.delete()	//delete channel
            .catch(error => console.log(error));
    }, delayMS);
}