const Command = require("../base/Command.js");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/users');

class test extends Command {
    constructor(client) {
        super(client, {
            name: "test",
            description: "A simple Coin Toss game",
            category: "Games",
            usage: "flip <Heads/Tails>",
            guildOnly: true,
            aliases: [],
            permLevel: "User"
        });
    }

    async run(message, args, level) {
        db.run('INSERT INTO users(name, id) VALUES(?, ?)', [message.member.user.username, message.member.user.id], (err) => {
            if(err) {
                return console.log(err.message); 
            }
        });
    }
}

module.exports = test;