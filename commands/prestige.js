module.exports.run = async(bot, message, args) => {
    if(args.length < 3)
    {
        return message.channel.send(this.help.description);
    }

    let allowedAccess = message.guild.roles.find("name", "Clan Council");

    if(allowedAccess === null)
    {
        return message.channel.send(`Sorry ${message.member.displayName} but you do not have sufficient permissions to prestige players`);
    }

    if(!message.member.roles.has(allowedAccess.id))
    {
        return message.channel.send(`Sorry ${message.member.displayName} but you do not have sufficient permissions to prestige players`);
    }

    //!prestige add pve @KillerAuzzie
    https.get(`https://api.itslit.uk/G4G/prestige/${args[0]}/${args[2]}/${args[1]}/true`, (resp) => {
        let data = '';

        //a chunk of data has been received
        resp.on('data', (chunk) => {
            data += chunk;
        });

        //the whole response is here
        resp.on('end', () => {
            return message.channel.send(`Prestige has been ${args[0]}ed for ${args[2]}'s ${args[1]} ladder and their score has been reset`);
        });
    }).on("error", (err) => {
        console.log(`Error: ${err.message}`);

        return message.channel.send(`Error: ${err.message}`);
    });
}

module.exports.help = {
    name: "Prestige",
    triggers: "prestige",
    description: `Either add or remove a prestige rank to a player in either the PvE or PvP ladders, the syntax is !${this.triggers} <add/remove> <Ladder Name> <Username>`
}