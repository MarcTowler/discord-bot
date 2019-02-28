// This event executes when a new member joins a server. Let's welcome them!

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
            `3: Confirm the Bungie Clan you have joined, eg G4G Orion\n` +
            `4: Accept the invitation to join our Guilded page, authorizing with your Discord details\n` +
            `5: Make sure you have \`Allow Direct Messages from Server Members\` turned on, this can be found in settings->Privacy and Safety`);

    if (member.guild.id === "220467406559117312") { //G4G
      member.guild.channels.get('525270659438215178').send(`Welcome to G4G <@${member.user.id}>`)
          .then(message =>
              member.guild.channels.get('525270659438215178').send(REmbed))
          .then(msg => member.guild.channels.get('538644586394812416').send(`oi ***fuckers*** stop chattin shit and get yo bitch asses into #pending_pool and welcome this mofo named <@${member.user.id}>`));
      member.guild.channels.get('544812700459335680').send(`${member.user.username} has joined`);  //bot log channel
    }
  };
}
