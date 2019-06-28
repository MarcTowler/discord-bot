const Command = require("../base/Command.js");

class createuserdb extends Command {
    constructor(client) {
        super(client, {
            name: "createuserdb",
            description: "creates the db",
            category: "System",
            usage: "",
            guildOnly: true,
            aliases: [],
            permLevel: "Moderator"
        });
    }

    async run(message, args, level) {
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database('./data/users');

        db.serialize(function() {
        db.run("CREATE TABLE users (name TEXT, id INTEGER, division TEXT)");
        });

        db.close();

        message.reply("User DB has been created!");
    }
}

module.exports = createuserdb;