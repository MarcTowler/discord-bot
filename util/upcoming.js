const Discord = require('discord.js');
const https = require('https');

module.exports = async(client) => {
    https.get(`https://api.guilded.gg/teams/QR4AyKlP/events?endDate=2019-04-04`, (resp) => {

        let data = '';

        //a chunk of data has been received
        resp.on('data', (chunk) => {
            data += chunk;
        });

        //the whole response is here
        resp.on('end', () => {
            let jsonData = JSON.parse(data);
            let xboxArray = [];

            jsonData['events'].forEach(function(element) {
                switch(element['allowedRoleIds'])
                {
                    case 412:
                        xboxArray.push(element);

                        break;
                }
            })
            //define 3 empty arrays, pc, ps4, xbox
            //foreach the data to loop
            //depending on requiredRole id, place into one of 3 arrays defined
            //once at the end, call xbox(), ps4(), pc()
            
        });
    })
}

function xbox(data)
{
    //format data for output then send
}

function ps4(data)
{
    //format data for output then send
}

function pc(data)
{
    //format data for output then send
}