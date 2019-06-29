// This event executes when a new member joins a server. Let's welcome them!
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/users');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {

    // Load the guild's settings
    const settings = this.client.getSettings(member.guild);

    // If welcome is off, don't proceed (don't welcome the user)
    if (settings.welcomeEnabled !== "true") return;

    // Replace the placeholders in the welcome message with actual data
    //const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

    let REmbed = new Discord.RichEmbed()
        .setThumbnail("https://i.imgur.com/IdGhpsp.png")
        .setColor(5233919)
        .setTitle(`To gain membership and full access to the G4G server, please perform the following steps:`)
        .setDescription(`1: Set your Discord nickname for this server to your Bungie gamer tag or B.net ID\n` +
            `2: Confirm your age\n` +
            `3: Register on our website https://clanevents.net \n` +
            `4: Link your discord account on Clan Events (click on your name on the top right->Profile->External Logins->Discord)\n` +
            `5: Make sure you have \`Allow Direct Messages from Server Members\` turned on, this can be found in settings->Privacy and Safety\n` +
            '6: Type `!check` in this channel');

    if (member.guild.id === "220467406559117312") { //G4G
        db.run('INSERT INTO users(name, id) VALUES(?, ?)', [member.user.username, member.user.id], (err) => {
            if(err) {
                return console.log(err.message); 
            }
        });

        member.guild.channels.get('525270659438215178').send(`Welcome to G4G <@${member.user.id}>`)
            .then(message =>
                member.guild.channels.get('525270659438215178').send(REmbed))
                .then(msg => member.guild.channels.get('538644586394812416').send(`**BEHOLD** <@${member.user.id}> has joined! They are currently verifying on Clan Events`))
                .then(msg => member.guild.channels.get('544812700459335680').send(`${member.user.username} has joined`));  //bot log channel
    }
  };
}
