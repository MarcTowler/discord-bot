const Command = require("../base/Command.js");
const { version } = require("discord.js");

class scrub extends Command {
    constructor(client) {
        super(client, {
            name: "Scrub",
            usage: "scrub",
            description: "Calling out all the scrubs",
            role: "everyone"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        message.channel.send(`
    \`\`\`
    o__ __o                                         o          
   /v     v\\                                       <|>         
  />       <\\                                      / >         
 _\\o____            __o__  \\o__ __o    o       o   \\o__ __o    
      \\_\\__o__     />  \\    |     |>  <|>     <|>   |     v\\   
            \\    o/        / \\   < >  < >     < >  / \\     <\\  
  \\         /   <|         \\o/         |       |   \\o/      /  
   o       o     \\\\         |          o       o    |      o   
   <\\__ __/>      _\\o__</  / \\         <\\__ __/>   / \\  __/>   
   \`\`\``);
    }
}

module.exports = scrub;
