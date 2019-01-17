const Discord = require('discord.js');
const fs = require("fs");
const config = require('./botconfig.json');

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")

    if(jsfile.length <= 0)
    {
        console.log("Couldn't find any commands");

        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);

        if(typeof props.help === "undefined")
        {} else {
            console.log(`Loaded ${props.help.name}`);
            bot.commands.set(props.help.triggers, props);
        }
    });
});

const activity_list = [
    "with the !help command.",
    "with the developers console",
    "with some code",
    "with your lives"
];


bot.on("ready", async () => {
    console.log(`${bot.user.username} is now online!`);
  
    setInterval(() => {
        const index = Math.floor(Math.random() * (activity_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(activity_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 60000);

    Notify_chan = bot.channels.find('id', '309597400434212865'); //Get the channel ID for #hellbot_thunderdome
});

setInterval(function() {
   let d = new Date();
   if(Math.floor((d.getTime() - start_time) / 3600000) % interval_hours > 0)
   {
       console.log(Math.floor((d.getTime() - start_time) / 3600000) % interval_hours > 0);
   } else {
       console.log(Math.floor((d.getTime() - start_time) / 3600000) % interval_hours > 0);
   }
    //Notify_chan.sendMessage('g upcoming');
}, 60 * 1000 * 60 * 72);

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(config.debug === true && message.author.id !== '131526937364529152') return;
    let prefix = config.prefix;
    let messageArray = message.content.replace(/  +/g, ' ').split(" ");
    let command = messageArray[0].toLowerCase();

    if(command.charAt(0) !== prefix) return;

    let args    = messageArray.slice(1); //takes the first item off the list aka the command

    let commandfile = bot.commands.get(command.slice(prefix.length));

    if(commandfile)
    {
        commandfile.run(bot, message, args);
    }
});

bot.on("guildMemberAdd", member => {
    let REmbed = new Discord.RichEmbed()
        .setThumbnail("https://i.imgur.com/IdGhpsp.png")
        //.setAuthor(`Welcome to G4G ${member.user.username}`)
        .setColor(5233919)
        .setTitle(`To gain membership and full access to the G4G server, please perform the following steps:`)
        .setDescription(`1: Set your Discord nickname for this server to your Bungie gamer tag or B.net ID\n` +
            `2: Confirm your age\n` +
            `3: Confirm the Bungie Clan you have joined, eg G4G Orion\n` +
            `4: Accept the invitation to join our Guilded page, authorizing with your Discord details`);

    if(member.guild.id === "220467406559117312") { //G4G
    //if(member.guild.id === "236484268237258752") { //GamingHaven

        //member.guild.channels.get('295671375773958145').send(REmbed); //GH
        member.guild.channels.get('525270659438215178').send(`Welcome to G4G <@${member.user.id}>`)
            .then(msg =>
                member.guild.channels.get('295671375773958145').send(REmbed));
    }
});

bot.login(config.token);
