const { EmbedBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = {

    name: "leaderboard",
    aliases: ['lb'],
    category: 'economy',
    description: 'Shows Server\'s Top 10 Users of Economy Leaderboard',
    usage: ' ',
    accessableby: "everyone"
    ,
    run: async (client, message) => {
        let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        if (!money.length) {
            let noEmbed = new EmbedBuilder()
                .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL() })
                .setColor("Green")
                .setFooter({ text: "Nothing To See Here Yet!" })
            return message.channel.send({ embeds: [noEmbed] })
        };

        money.length = 10;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - ${money[i].data} :dollar:\n`;
        };

        const embed = new EmbedBuilder()
            .setTitle(`Leaderboard Of ${message.guild.name}`)
            .setColor("Green")
            .setDescription(finalLb)
            .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
        message.channel.send({ embeds: [embed] });
    }
};