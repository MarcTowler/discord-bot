//This loads when a member leaves or is kicked/banned
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        const entry = await message.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());

        if(entry.target['id'] === member.user.id)
        {
            member.guild.channels.get('544812700459335680').send(`${member.user.username} was kicked`);
        } else {
            member.guild.channels.get('538644586394812416').send(`${member.user.username} has left, please remove them from Bungie`);
        }
    }
}
