const Command = require("../base/Command.js");

class raidroulette extends Command {
  constructor (client) {
    super(client, {
      name: "raidroulette",
      description: "Play some Raid Roulette",
      usage: "raidroulette",
      aliases: ["rr"]
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    const types = ['all solar', 'all arc', 'all void', 'two solar, one void', 'two solar, one arc', 'two arc, one void', 'any mix of'];
    const raids = ['Leviathan', 'Eater of Worlds', 'Spire of Stars', 'Last Wish', 'Scourge of the Past', 'Crown of Sorrow'];

    message.reply(`Have fun, you will be running the ${raids[Math.floor(Math.random() * raids.length)]} raid with ${types[Math.floor(Math.random() * types.length)]} subclasses`);
  }
}

module.exports = raidroulette;
