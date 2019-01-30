const Discord = require('discord.js');
const fs = require("fs");
const config = require('./botconfig.json');
let applicationQuestions = require("./application-questions.js");

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

let usersApplicationStatus = [];
let userToSubmitApplicationsTo = "416354331592359936";

const applicationFormCompleted = (client, data) => {
    let REmbed = new Discord.RichEmbed()
        .setAuthor('Requester: ' + data.user.username)
        .setTitle(`A new event request has been submitted!`)
        .setColor(5233919)
        .addField('Platform', data.answers[0])
        .addField('Requested Date', data.answers[1])
        .addField('Requested Time', data.answers[2])
        .addField('Game Requested', data.answers[3])
        .addField('Activity', data.answers[4])
        .addField('Requested Difficulty', data.answers[5])
        .addField('Requested Ability Level', data.answers[6])
        .addField('Comments', data.answers[7]);

    if(data.answers[0].toLowerCase() === 'xbox')
    {
        client.channels.get(userToSubmitApplicationsTo).send(`**BEHOLD** <@&365412296945565706> you have a new event request!`)
            .then(client.channels.get(userToSubmitApplicationsTo).send(REmbed));
    } else if(data.answers[0].toLowerCase() === 'ps4') {
        client.channels.get(userToSubmitApplicationsTo).send(`**BEHOLD** <@&370195805610573824> you have a new event request!`)
            .then(client.channels.get(userToSubmitApplicationsTo).send(REmbed));
    } else {
        client.channels.get(userToSubmitApplicationsTo).send(`**BEHOLD** <@&370195805610573824> you have a new event request!`)
            .then(client.channels.get(userToSubmitApplicationsTo).send(REmbed));
    }
    usersApplicationStatus = usersApplicationStatus.filter(el => el.id !== user.id)
};

const sendUserApplyForm = message => {
    const user = usersApplicationStatus.find(user => user.id === message.author.id);

    if (!user) {
        //message.author.send(`Application commands: \`\`\`${botChar}cancel, ${botChar}redo\`\`\``);
        message.author.send(applicationQuestions[0]);
        usersApplicationStatus.push({id: message.author.id, currentStep: 0, answers: [], user: message.author});
    } else {
        message.author.send(applicationQuestions[user.currentStep]);
    }
};

const cancelUserApplicationForm = (message, isRedo = false) => {
    const user = usersApplicationStatus.find(user => user.id === message.author.id);

    if (user) {
        usersApplicationStatus = usersApplicationStatus.filter(el => el.id !== user.id)
        message.reply("Application canceled.");
    } else if (!isRedo) {
        message.reply("You have not started an application form yet.");
    }
};

bot.on("ready", async () => {
    console.log(`${bot.user.username} is now online for ${bot.guilds.size} servers!`);
  
    setInterval(() => {
        const index = Math.floor(Math.random() * (activity_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(activity_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 60000);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") {
        const user = usersApplicationStatus.find(user => user.id === message.author.id);

        if (user && message.content) {
            user.answers.push(message.content);
            user.currentStep++;

            if (user.currentStep >= applicationQuestions.length) {
                applicationFormCompleted(bot, user);
                message.author.send("Congratulations your application has been sent!");
            } else {
                if(user.currentStep === 5 && message.content.toLowerCase() !== 'raid')
                {
                    user.currentStep++;
                }
                message.author.send(applicationQuestions[user.currentStep]);
            }
        }
    }

    if(config.debug === true && message.author.id !== '131526937364529152') return;
    let prefix = config.prefix;
    let messageArray = message.content.replace(/  +/g, ' ').split(" ");
    let command = messageArray[0].toLowerCase();

    if(command.charAt(0) !== prefix) return;

    let args    = messageArray.slice(1); //takes the first item off the list aka the command

    let commandfile = bot.commands.get(command.slice(prefix.length));
    //console.log(commandfile);
    if(commandfile)
    {
        if(commandfile.help.triggers === 'eventrequest')
        {
            sendUserApplyForm(message);
        } else {
            commandfile.run(bot, message, args);
        }
    }
});

bot.on("guildMemberAdd", member => {
    let REmbed = new Discord.RichEmbed()
        .setThumbnail("https://i.imgur.com/IdGhpsp.png")
        .setColor(5233919)
        .setTitle(`To gain membership and full access to the G4G server, please perform the following steps:`)
        .setDescription(`1: Set your Discord nickname for this server to your Bungie gamer tag or B.net ID\n` +
            `2: Confirm your age\n` +
            `3: Confirm the Bungie Clan you have joined, eg G4G Orion\n` +
            `4: Accept the invitation to join our Guilded page, authorizing with your Discord details\n` +
            `5: Make sure you have \`Allow Direct Messages from Server Members\` turned on, this can be found in settings->Privacy and Safety`);

    if(member.guild.id === "220467406559117312") { //G4G
        member.guild.channels.get('525270659438215178').send(`Welcome to G4G <@${member.user.id}>`)
            .then(message =>
                member.guild.channels.get('295671375773958145').send(REmbed));
    }
});

bot.login(config.token);
