const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
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

module.exports.help = {
    name: "Scrub",
    triggers: "scrub",
    description: `Call out all the scrubs`,
    role: "everyone"
}
