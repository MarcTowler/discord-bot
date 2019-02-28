const Command = require("../base/Command.js");
const Twitter = require('twitter');
const config = require('./twitterconfig.js');
const Discord = require("discord.js");


class Twitter extends Command {
    constructor(client) {
        super(client, {
            name: "twitter code",
            description: "posts last x amount of message from twitter to channel",
            category: "Clan",
            usage: "twitter",
            guildOnly: true,
            aliases: [],
            permLevel: "Bot Support"
        });
    }

async run(message, args, level) {

	let T = new Twitter(config);
	let params = {
		  q: '#G4G',
		  count: 1, //gets the x amount posts
		  result_type: 'recent',
		  lang: 'en'
		}
	T.get('search/tweets', params, function(err, data, response) {
	  if(!err){
		
		// Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }
      // Try to Favorite the selected Tweet
      T.post('favorites/create', id, function(err, response){
        // If the favorite fails, log the error message
        if(err){
          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
		
	  } else {
		console.log(err);
  }
})

}

module.exports = Twitter;