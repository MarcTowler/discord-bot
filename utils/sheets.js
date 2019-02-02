const google = require('google-spreadsheet');
const creds = require('../credentials.json');
const doc = new google('1JRlA4XE1qTl1hPWFisElshJsXxehb0xzbPytZ1bBArw');

module.exports = async(details) => {
    let ts = new Date();

    doc.useServiceAccountAuth(creds, function (err) {
        /*doc.getRows(1, function(err, rows) {
            console.log(rows.length);
        });*/
        if(details.answers.length === 9) {
            doc.addRow(1, { //raid
                Timestamp: new Date(ts.getTime()).toUTCString(),
                Member_Name: details.user.username,
                Platform: details.answers[0].toUpperCase(),
                Event_Date: details.answers[1],
                Time: `'${details.answers[2]}`,
                Game: (details.answers[3].toLowerCase() === 'd2') ? "Destiny 2" : "Destiny 1",
                Activity: details.answers[4],
                Raid_Type: details.answers[5],
                Difficulty: details.answers[6],
                Ability_Preference: details.answers[7],
                Comments_Notes: details.answers[8]
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        } else if(details.answers.length === 8) { //crucible
            doc.addRow(1, {
                Timestamp: new Date(ts.getTime()).toUTCString(),
                Member_Name: details.user.username,
                Platform: details.answers[0].toUpperCase(),
                Event_Date: details.answers[1],
                Time: `'${details.answers[2]}`,
                Game: (details.answers[3].toLowerCase() === 'd2') ? "Destiny 2" : "Destiny 1",
                Activity: details.answers[4],
                Raid_Type: details.answers[5],
                Difficulty: " ",
                Ability_Preference: " ",
                Comments_Notes: details.answers[6]
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        } else if(details.answers.length === 7) { //crucible, gambit, nightfall, milestones
            doc.addRow(1, {
                Timestamp: new Date(ts.getTime()).toUTCString(),
                Member_Name: details.user.username,
                Platform: details.answers[0].toUpperCase(),
                Event_Date: details.answers[1],
                Time: `'${details.answers[2]}`,
                Game: (details.answers[3].toLowerCase() === 'd2') ? "Destiny 2" : "Destiny 1",
                Activity: details.answers[4],
                Raid_Type: details.answers[5],
                Difficulty: " ",
                Ability_Preference: " ",
                Comments_Notes: details.answers[6]
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            doc.addRow(1, {
                Timestamp: new Date(ts.getTime()).toUTCString(),
                Member_Name: details.user.username,
                Platform: details.answers[0].toUpperCase(),
                Event_Date: details.answers[1],
                Time: `'${details.answers[2]}`,
                Game: (details.answers[3].toLowerCase() === 'd2') ? "Destiny 2" : "Destiny 1",
                Activity: details.answers[4],
                Raid_Type: " ",
                Difficulty: " ",
                Ability_Preference: " ",
                Comments_Notes: details.answers[5],
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        if(err)
        {
            throw err;
        }
    });
}