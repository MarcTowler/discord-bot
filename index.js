if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const klaw = require("klaw");
const path = require("path");
const http = require('http');
const express = require('express');
const app = express();

app.get('/', (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

class Bot extends Client {
    constructor (options) {
        super(options);


        this.config = require("./config.js");
        // client.config.token contains the bot's token
        // client.config.prefix contains the message prefix

        // Aliases and commands are put in collections where they can be read from,
        // catalogued, listed, etc.
        this.commands = new Collection();
        this.aliases = new Collection();

        this.settings = new Enmap({ name: "settings", cloneLevel: "deep", fetchAll: false, autoFetch: true });
        this.logger = require("./modules/Logger");
        this.wait = require("util").promisify(setTimeout);
    }

    permlevel (message) {
        let permlvl = 0;

        const permOrder = this.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

        while (permOrder.length) {
          const currentLevel = permOrder.shift();
          if (message.guild && currentLevel.guildOnly) continue;
          if (currentLevel.check(message)) {
            permlvl = currentLevel.level;
            break;
          }
        }

        return permlvl;
    }

    loadCommand (commandPath, commandName) {
        try {
            if(client.aliases.has(commandName)) commandName = client.aliases.get(commandName);

            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }

            this.commands.set(props.help.name, props);

            props.conf.aliases.forEach(alias => {
                this.aliases.set(alias, props.help.name);
            });
          
            return false;

          } catch (e) {
              return `Unable to load command ${commandName}: ${e}`;
          }
    }

    async unloadCommand (commandPath, commandName) {
        let command;

        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)) {
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

        if (command.shutdown) {
            await command.shutdown(this);
        }

        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];

        return false;
    }

    getSettings (guild) {
        const defaults = this.config.defaultSettings || {};
        const guildData = this.settings.get(guild.id) || {};
        const returnObject = {};

        Object.keys(defaults).forEach((key) => {
            returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
        });

        return returnObject;
    }

    writeSettings (id, newSettings) {
        const defaults = this.settings.get("default");
        let settings = this.settings.get(id);

        if (typeof settings != "object") settings = {};

        for (const key in newSettings) {
            if (defaults[key] !== newSettings[key]) {
                settings[key] = newSettings[key];
            } else {
                delete settings[key];
            }
        }

        this.settings.set(id, settings);
    }

    async awaitReply (msg, question, limit = 60000) {
        const filter = m=>m.author.id = msg.author.id;
        await msg.channel.send(question);

        try {
          const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
          return collected.first().content;
        } catch (e) {
          return false;
        }
    }
}

const client = new Bot();

console.log(client.config.permLevels.map(p => `${p.level} : ${p.name}`));

const init = async () => {
    klaw("./commands").on("data", (item) => {

        const cmdFile = path.parse(item.path);

        if (!cmdFile.ext || cmdFile.ext !== ".js") return;

        const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);

        if (response) client.logger.error(response);
    });

    const evtFiles = await readdir("./events/");

    client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");

    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];

        client.logger.log(`Loading Event: ${eventName}`);

        const event = new (require(`./events/${file}`))(client);

        client.on(eventName, (...args) => event.run(...args));

        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.levelCache = {};

    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];

        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);
};

init();

client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
      .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
      .on("error", e => client.logger.error(e))
      .on("warn", info => client.logger.warn(info));

String.prototype.toProperCase = function () {
    return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");

    console.error("Uncaught Exception: ", errorMsg);

    process.exit(1);
});

process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});