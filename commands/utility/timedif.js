const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { UniqueID } = require('nodejs-snowflake');

module.exports = {
        name: "timedif",
        description: "Differentiatie time",
        usage: ``,
        category: "utility",
        aliases: ["timedif"],

run: async (client, message, args) => {

let time1 = args[0];
    let time2 = args[1];
    const uid = new UniqueID(time1);
    const t1 = uid.getTimestampFromID(time1);

    const uid2 = new UniqueID(time2);
    const t2 = uid2.getTimestampFromID(time2);

        if(!time1) {
       return message.reply("missing arguments") 

       }   else if (!time2) {
        return message.reply("Missing arguments") 
    }
    else{
        const embed = new MessageEmbed()
        .setTitle('Time Difference')
        .setColor("#1a8cff")
        .setDescription(`${(t2-t1)/1000} seconds`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }));
        message.channel.send(embed)
    }
}}