const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const klaw = require("klaw");
const path = require("path");


class Bot extends Client {
    constructor (options) {
        super(options);

        this.config = require("./config.js");
        this.commands = new Collection();
        this.aliases = new Collection();
        this.settings = new Enmap({ name: "settings", cloneLevel: "deep", fetchAll: false, autoFetch: true });
        this.logger = require("./modules/Logger");
        this.wait = require("util").promisify(setTimeout);
    }

    /*
    PERMISSION LEVEL FUNCTION
    This is a very basic permission system for commands which uses "levels"
    "spaces" are intentionally left black so you can add them if you want.
    NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
    command including the VERY DANGEROUS `eval` command!
    */
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

    /*
    COMMAND LOAD AND UNLOAD

    To simplify the loading and unloading of commands from multiple locations
    including the index.js load loop, and the reload function, these 2 ensure
    that unloading happens in a consistent manner across the board.
    */

    loadCommand (commandPath, commandName) {
        try {
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

    /* SETTINGS FUNCTIONS
    These functions are used by any and all location in the bot that wants to either
    read the current *complete* guild settings (default + overrides, merged) or that
    wants to change settings for a specific guild.
    */

    // getSettings merges the client defaults with the guild settings. guild settings in
    // enmap should only have *unique* overrides that are different from defaults.
    getSettings (guild) {
        const defaults = this.config.defaultSettings || {};
        const guildData = this.settings.get(guild.id) || {};
        const returnObject = {};
        Object.keys(defaults).forEach((key) => {
            returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
        });
        return returnObject;
    }

    // writeSettings overrides, or adds, any configuration item that is different
    // than the defaults. This ensures less storage wasted and to detect overrides.
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

    /*
    SINGLE-LINE AWAITMESSAGE
    A simple way to grab a single reply, from the user that initiated
    the command. Useful to get "precisions" on certain things...
    USAGE
    const response = await client.awaitReply(msg, "Favourite Color?");
    msg.reply(`Oh, I really love ${response} too!`);
    */
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

    // Here we load **commands** into memory, as a collection, so they're accessible
    // here and everywhere else.
    klaw("./commands").on("data", (item) =>
    {
        const cmdFile = path.parse(item.path);
        if (!cmdFile.ext || cmdFile.ext !== ".js") return;

        const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);

        if (response)
        {
            client.logger.error(response);
        }
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");

    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];

        client.logger.log(`Loading Event: ${eventName}`);

        const event = new (require(`./events/${file}`))(client);

        // This line is awesome by the way. Just sayin'.
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

// <Array>.random() returns a single random element from an array
// [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
    // Always best practice to let the code crash on uncaught exceptions.
    // Because you should be catching them anyway.
    process.exit(1);
});

process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});