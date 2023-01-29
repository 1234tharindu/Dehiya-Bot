const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");

module.exports = {

    name: "withdraw",
    aliases: ["wd"],
    category: "economy",
    description: "Withdraws Money From Bank",
    usage: "<amount>",

    run: async (client, message, args) => {
        let user = message.author;

        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌**You Do Not Have Any Money To Withdraw!**`)
            if (!money) return message.channel.send({ embeds: [embed] })
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ You have withdrawn all your coins from your bank`);
            message.channel.send({ embeds: [embed5] })

        } else {

            let embed2 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ Specify an amount to withdraw!`);

            if (!args[0]) {
                return message.channel.send({ embeds: [embed2] })
            }
            let embed6 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ Your Amount Is Not A Number!`)

            if (isNaN(args[0])) {
                return message.channel.send({ embeds: [embed6] })
            }
            let embed3 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You can't withdraw negative money!`);

            if (message.content.includes('-')) {
                return message.channel.send({ embeds: [embed3] })
            }
            let embed4 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You don't have that much money in the bank!`);

            if (member2 < args[0]) {
                return message.channel.send({ embeds: [embed4] })
            }

            let embed5 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ You have withdrawn ${args[0]} coins from your bank!`);

            message.channel.send({ embeds: [embed5] })
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${user.id}`, args[0])
        }
    }
}