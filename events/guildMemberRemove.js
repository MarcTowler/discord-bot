//This loads when a member leaves or is kicked/banned
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(member) {
        member.guild.channels.get('538644586394812416').send(`${member.user.username} has left, please remove them from Bungie and Guilded`);
    }
}
