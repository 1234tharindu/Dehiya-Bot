const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {

    name: "deposit",
    aliases: ["dep"],
    category: "economy",
    description: "Deposits money to bank",
    usage: "<amount>",
    accessableby: "everyone"
    ,
    run: async (client, message, args) => {

        let user = message.author;

        let member = db.fetch(`money_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)

            let embedbank = new EmbedBuilder()
                .setColor('Green')
                .setDescription("❌ You don't have any money to deposit")

            if (!money) return message.channel.send({ embeds: [embedbank] })

            db.subtract(`money_${user.id}`, money)
            db.add(`bank_${user.id}`, money)
            let sembed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ You have deposited all your coins into your bank`);
            message.channel.send({ embeds: [sembed] })

        } else {

            let embed2 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ Specify an amount to deposit`);

            if (!args[0]) {
                return message.channel.send({ embeds: [embed2] })
                    .catch(err => message.channel.send(err.message))
            }
            let embed6 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ Your Amount Is Not A Number!`)

            if (isNaN(args[0])) {
                return message.channel.send({ embeds: [embed6] })

            }
            let embed3 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You can't deposit negative money`);

            if (message.content.includes('-')) {
                return message.channel.send({ embeds: [embed3] })
            }
            let embed4 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You don't have that much money`);

            if (member < args[0]) {
                return message.channel.send({ embeds: [embed4] })
            }

            let embed5 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ You have deposited ${args[0]} coins into your bank`);

            message.channel.send({ embeds: [embed5] })
            db.subtract(`money_${user.id}`, args[0])
            db.add(`bank_${user.id}`, args[0])

        }
    }
}