const { EmbedBuilder } = require("discord.js");
const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {

    name: "roulette",
    aliases: ["roul"],
    category: "economy",
    description: "Bet a colour to win or lose",
    usage: "[colour]<amount>",
    accessableby: "everyone"
    ,
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`);
        if (!prefix) {
            prefix = default_prefix;
        }

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = await db.fetch(`money_${user.id}`)

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`❌ Specify an amount to gamble | ${prefix}roulette <color> <amount>`);

        let moneymore = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`❌ You are betting more than you have`);

        let colorbad = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`❌ Specify a color | Red [1.5x] (normal) Black [2x] (hard) Green [15x](rare)`);

        if (!colour) return message.channel.send(colorbad);
        colour = colour.toLowerCase()
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else return message.channel.send(colorbad);

        if (random == 1 && colour == 2) { // Green
            money *= 15
            db.add(`money_${user.id}`, money)
            let moneyEmbed1 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`✅ You won ${money} coins\n\nMultiplier: 15x`);
            message.channel.send({ embeds: [moneyEmbed1] })
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            db.add(`money_${user.id}`, money)
            let moneyEmbed2 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`🔴 You won ${money} coins\n\nMultiplier: 1.5x`);
            message.channel.send({ embeds: [moneyEmbed2] })
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            db.add(`money_${user.id}`, money)
            let moneyEmbed3 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`⬛ You won ${money} coins\n\nMultiplier: 2x`);
            message.channel.send({ embeds: [moneyEmbed3] })
        } else { // Wrong
            db.subtract(`money_${user.id}`, money)
            let moneyEmbed4 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`❌ You lost ${money} coins\n\nMultiplier: 0x`);
            message.channel.send({ embeds: [moneyEmbed4] })
        }
        db.add(`games_${user.id}`, 1)
    }
}