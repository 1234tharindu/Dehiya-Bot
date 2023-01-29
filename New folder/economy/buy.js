const { EmbedBuilder } = require('discord.js')
const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {

    name: "buy",
    noalias: [""],
    category: "economy",
    description: "buys items",
    usage: "[item]",
    accessableby: "everyone"
    ,
    run: async (client, message, args) => {
        let user = message.author;
        let prefix = db.get(`prefix_${message.guild.id}`);
        if (!prefix) {
            prefix = default_prefix;
        }
        let author = db.fetch(`money_${user.id}`)

        let Embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`❌ You need 200 coins to purchase Bronze VIP`);


        if (args.join(' ').toLocaleLowerCase() == 'bronze') {
            if (author < 200) return message.channel.send({ embeds: [Embed] })

            await db.fetch(`bronze_${user.id}`);
            db.set(`bronze_${user.id}`, true)

            let Embed2 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ Purchased Bronze VIP For 200 Coins`);

            db.subtract(`money_${user.id}`, 200)
            message.channel.send({ embeds: [Embed2] })
        } else if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let Embed3 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You need 600 coins to purchase some Nikes`);

            if (author < 600) return message.channel.send({ embeds: [Embed3] })

            await db.fetch(`nikes_${user.id}`)
            db.add(`nikes_${user.id}`, 1)

            let Embed4 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ Purchased Fresh Nikes For 600 Coins`);

            db.subtract(`money_${user.id}`, 600)
            message.channel.send({ embeds: [Embed4] })
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let Embed5 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You need 800 coins to purchase a new car`);

            if (author < 800) return message.channel.send({ embeds: [Embed5] })

            await db.fetch(`car_${user.id}`)
            db.add(`car_${user.id}`, 1)

            let Embed6 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ Purchased A New Car For 800 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 800)
            message.channel.send({ embeds: [Embed6] })
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let Embed7 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You need 1200 coins to purchase a Mansion`);

            if (author < 1200) return message.channel.send({ embeds: [Embed7] })

            await db.fetch(`house_${user.id}`)
            db.add(`house_${user.id}`, 1)

            let Embed8 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ Purchased A Mansion For 1200 Coins`);

            db.subtract(`money_${user.id}`, 1200)
            message.channel.send({ embeds: [Embed8] })
        } else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed9 = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`❌ Enter An Item To Buy!\nType ${prefix}shop To See List Of Items!`)
                return message.channel.send({ embeds: [embed9] })
            }
        }
    }
}