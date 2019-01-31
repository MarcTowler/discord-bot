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
//let userToSubmitApplicationsTo = "416354331592359936";
let userToSubmitApplicationsTo = "520182741959180288"; //#web_team

const applicationFormCompleted = (client, data) => {
    let REmbed = new Discord.RichEmbed()
        .setAuthor('Requester: ' + data.user.username)
        .setTitle(`A new event request has been submitted!`)
        .setColor(5233919)
        .addField('Platform', data.answers[0])
        .addField('Requested Date', data.answers[1])
        .addField('Requested Time', data.answers[2])
        .addField('Game Requested', data.answers[3])
        .addField('Activity', data.answers[4]);

    if(data.answers[4].toLowerCase() === "raid")
    {
        REmbed.addField('Raid Event', data.answers[5]);
        REmbed.addField('Requested Difficulty', data.answers[6]);
        REmbed.addField('Requested Ability Level', data.answers[7]);
        REmbed.addField('Comments', data.answers[8]);
    } else if(data.answers[4].toLowerCase() === "crucible") {
        REmbed.addField('Crucible Mode', data.answers[5]);
        REmbed.addField('Comments', data.answers[6]);
    } else {
        REmbed.addField('Comments', data.answers[5]);
    }

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

    let sheets = require('./utils/sheets.js');

    sheets(data);

    usersApplicationStatus = usersApplicationStatus.filter(el => el.id !== data.user.id);
};

const sendUserApplyForm = message => {
    const user = usersApplicationStatus.find(user => user.id === message.author.id);

    if (!user) {
        message.author.send('You want to request an event? Answer my questions first!');
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
        message.reply("You have not started an event request yet.");
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
            switch(user.currentStep)
            {
                case 0:
                    if(message.content.toLowerCase() === 'pc' || message.content.toLowerCase() === 'p.c.' || message.content.toLowerCase() === 'xbox' || message.content.toLowerCase() === 'ps4')
                    {

                    } else {
                        console.log(message.content);
                        message.author.send(`${message.content} is not a valid platform, try again and enter either PC, XBOX or PS4`);
                        return message.author.send(applicationQuestions[0]);
                    }

                    break;
                case 1:
                    if(isNaN(Date.parse(message.content)))
                    {
                        message.author.send(`Please enter a valid date, not ${message.content}`);
                        return message.author.send(applicationQuestions[1]);
                    } else if((Date.parse(message.content) - Date.now()) <= 86400000) {
                        message.author.send(`Please set a date at least 24 hours in the future!`);
                        return message.author.send(applicationQuestions[1]);
                    }

                    break;
                case 2:
                    if(message.content.length < 4 || message.content.length > 5)
                    {
                        message.author.send(`Please put in a valid time, in UTC. Example: 16:00 is 4pm`);
                        return message.author.send(applicationQuestions[2]);
                    }

                    break;
                case 3:
                    if(message.content.toLowerCase() === 'd1' || message.content.toLowerCase() === 'd2')
                    {

                    } else {
                        message.author.send(`Please enter either D1 or D2 as your answer, not ${message.content}`);
                        return message.author.send(applicationQuestions[3]);
                    }

                    break;
                case 4:
                    if(message.content.toLowerCase() === 'raid' || message.content.toLowerCase() === 'crucible' ||
                        message.content.toLowerCase() === 'gambit' || message.content.toLowerCase() === 'nightfall' ||
                        message.content.toLowerCase() === 'milestones')
                    {

                    } else {
                        message.author.send(`Please enter one of the following: Raid, Crucible, Gambit, Nightfall or Milestones`);
                        return message.author.send(applicationQuestions[4]);
                    }

                    break;
                case 5:
                    if(message.content.toLowerCase() === 'last wish' || message.content.toLowerCase() === 'scourge of the past' ||
                        message.content.toLowerCase() === 'leviathan' || message.content.toLowerCase() === 'eater of worlds' ||
                        message.content.toLowerCase() === 'spire of stars' || message.content.toLowerCase() === 'sos' ||
                        message.content.toLowerCase() === 'eow' || message.content.toLowerCase() === 'sotp')
                    {

                    } else {
                        message.author.send(`Please enter one of the following raids: Last Wish, Scourge of the Past, Leviathan, Eater of Worlds, Spire of Stars`);
                        return message.author.send(applicationQuestions[5]);
                    }
                    break;
                case 6:
                    if(message.content.toLowerCase() === 'quickplay' || message.content.toLowerCase() === 'iron banner' ||
                        message.content.toLowerCase() === 'competitive')
                    {

                    } else {
                        message.author.send(`Please enter one of the following: Quickplay, Iron Banner or Competitive`);
                        return message.author.send(applicationQuestions[6]);
                    }
                    break;
                case 7:
                    if(message.content.toLowerCase() === 'normal' || message.content.toLowerCase() === 'prestige')
                    {

                    } else {
                        message.author.send(`Please enter one of the following: Normal or Prestige`);
                        return message.author.send(applicationQuestions[7]);
                    }
                    break;
                case 8:
                    if(message.content.toLowerCase() === 'training' || message.content.toLowerCase() === 'intermediate' ||
                        message.content.toLowerCase() === 'advanced')
                    {

                    } else {
                        message.author.send(`Please enter one of the following: Training, Intermediate or Advanced`);
                        return message.author.send(applicationQuestions[8]);
                    }
                    break;
            }

            user.answers.push(message.content);

            if(typeof user.answers[4] !== 'undefined')
            {
                if (user.answers[4].toLowerCase() === 'crucible' && user.answers.length === 5) {
                    user.currentStep++;
                } else if((user.answers[4].toLowerCase() === 'nightfall' || user.answers[4].toLowerCase() === 'gambit' || user.answers[4].toLowerCase() === 'milestones') && user.currentStep != 10) {
                    user.currentStep = 10;
                    return message.author.send(applicationQuestions[9]);
                }
            }

            user.currentStep++;

            //console.log(user.currentStep);
            //console.log(user.answers);

            if (user.currentStep >= applicationQuestions.length) {
                applicationFormCompleted(bot, user);
                message.author.send("Congratulations your event request has been sent!");
            } else {
                console.log('content is: ' + message.content + " and step is: " + user.currentStep);
                if(user.currentStep === 5 && message.content.toLowerCase() !== 'raid')
                {
                    user.currentStep++;
                    if(message.content.toLowerCase() !== 'crucible')
                    {
                        user.currentStep++;
                    }
                } else if(user.currentStep === 6 && user.answers[4].toLowerCase() === 'raid') {
                    user.currentStep++;
                } else if(user.currentStep === 7 && user.answers[4].toLowerCase() === 'crucible') {
                    user.currentStep = user.currentStep + 2;
                }
                message.author.send(applicationQuestions[user.currentStep]);
            }
        }
    }

    if(config.debug === true && (message.channel.id !== '520182741959180288' && message.author.id !== '131526937364529152')) return;

    let prefix = config.prefix;
    let messageArray = message.content.replace(/  +/g, ' ').split(" ");
    let command = messageArray[0].toLowerCase();

    if(command.charAt(0) !== prefix) return;

    let args    = messageArray.slice(1); //takes the first item off the list aka the command

    let commandfile = bot.commands.get(command.slice(prefix.length));

    if(commandfile)
    {
        if(commandfile.help.triggers === 'testrequest')
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

    if(member.guild.id === "220467406559117312" && config.debug === false) { //G4G
        member.guild.channels.get('525270659438215178').send(`Welcome to G4G <@${member.user.id}>`)
            .then(message =>
                member.guild.channels.get('295671375773958145').send(REmbed))
            .then(msg => member.guild.channels.get('538644586394812416').send(`oi ***fuckers*** stop chattin shit and get yo bitch asses into #pending_pool and welcome this mofo named <@${member.user.id}>`));
    }
});

bot.on("guildMemberRemove", member => {
    member.guild.channels.get('538644586394812416').send(`<@${member.user.id}> has left, please remove them from Bungie and Guilded`);
});

bot.login(config.token);
