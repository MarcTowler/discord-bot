const Command = require("../base/Command.js");
const http = require('https');

class pardon extends Command {
    constructor(client) {
        super(client, {
            name: "pardon",
            description: "Pardons a user's warning, requires warning ID",
            category: "Clan",
            usage: "pardon <id>",
            guildOnly: true,
            aliases: [],
            permLevel: "Clan Council"
        });
    }

    async run(message, args, level) {
        if(args.length < 1) return message.reply('Remember, `!pardon <id>` is the command, use it!');
      
        http.get(`https://api.itslit.uk/G4G/remove_warn/${args[0]}`, (resp) => {

            let data = '';

            //a chunk of data has been received
            resp.on('data', (chunk) => {
                data += chunk;
            });

            //the whole response is here
            resp.on('end', () => {
                let jData = JSON.parse(data);

                let success = (jData['response'] == 1) ? `Warning #${args[0]} successfully pardoned` : `Warning #${args[0]} doesn't exist`;

                message.reply(success);
            });
        });
    }
}

module.exports = pardon;