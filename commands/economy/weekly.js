const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {

    name: "weekly",
    aliases: ["week"],
    category: "economy",
    description: "Gives You 5000 per Week",
    usage: " ",
    accessableby: "everyone"
    ,
    run: async (client, message) => {

        let user = message.author;
        let timeout = 604800000;
        let amount = 5000;

        let weekly = await db.fetch(`weekly_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            let timeEmbed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send({ embeds: [timeEmbed] })
        } else {
            let moneyEmbed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ You've collected your weekly reward of ${amount} coins`);
            message.channel.send({ embeds: [moneyEmbed] })
            db.add(`money_${user.id}`, amount)
            db.set(`weekly_${user.id}`, Date.now())


        }
    }
}