const Command = require("../base/Command.js");
const Discord = require("discord.js");

class DivisionList extends Command {
    constructor(client) {
        super(client, {
            name: "division list",
            description: "view a count of members by each division / platform",
            category: "Clan",
            usage: "divisionlist",
            guildOnly: true,
            aliases: [],
            permLevel: "User"
        });
    }

async run(message, args, level) {
	//PS4 division roles
	let pegasus = "480005301861482543";
	let cygnus = "480005172463140865";
	let orion = "480004886294036491";
	//XBOX division roles
	let artemis = "480005748022050836";
	let scorpius = "505035203991961613";
	let hydra = "507990801658150917";
	//PC division roles
	let draco = "480005533643046932";
	let pheonix = "493721218600402944";

	let ps4d1 = message.guild.roles.get(pegasus).members;
	let ps4d2 = message.guild.roles.get(cygnus).members;
	let ps4d3 = message.guild.roles.get(orion).members;

	let xboxd1 = message.guild.roles.get(artemis).members;
	let xboxd2 = message.guild.roles.get(scorpius).members;
	let xboxd3 = message.guild.roles.get(hydra).members;

	let pcd1 = message.guild.roles.get(draco).members;
	let pcd2 = message.guild.roles.get(pheonix).members;

function send2Embeds(message) {
    let channel = message.channel;

    // next create rich embeds
    let embed1 = new Discord.RichEmbed({
		.setAuthor('Playstation Divisions')
		.setThumbnail('https://cdn4.iconfinder.com/data/icons/miu-black-social-2/60/playstation-512.png')
		.addField('Pegasus', `${ps4d1.size} members`, true)
		.addField('Cygnus', `${ps4d2.size} members`, true)
		.addField('Orion', `${ps4d3.size} members`, true)
    });

    let embed2 = new Discord.RichEmbed({
		.setAuthor('XBox Divisions')
		.setThumbnail('https://cdn4.iconfinder.com/data/icons/materia-social-free/24/038_025_xbox_game_network_android_material-512.png')
		.addField('Artemis', `${xboxd1.size} members`, true)
		.addField('Hydra', `${xboxd2.size} members`, true)
    });

    let embed3 = new Discord.RichEmbed({
		.setAuthor('PC Divisions')
		.setThumbnail('https://cdn3.iconfinder.com/data/icons/picons-social/57/72-windows8-512.png')
		.addField('Draco', `${pcd1.size} members`, true)
		.addField('Phoenix', `${pcd2.size} members`, true)
		.addField('Scorpius', `${pcd3.size} members`, true)
    });

    // send embed to channel
    channel.send(embed1)
    .then(msg => {
        // after the first is sent, send the 2nd (makes sure it's in the correct order)
        channel.send(embed2);
    }).then(msg => {
        // after the second is sent, send the 3rd (makes sure it's in the correct order)
        channel.send(embed3);
    });
}
}

module.exports = DivisionList;
