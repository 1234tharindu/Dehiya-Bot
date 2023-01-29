const { EmbedBuilder } = require('discord.js');
const db = require("quick.db");
const { default_prefix } = require("../../config.json");

module.exports = {

    name: "shop",
    noalias: [""],
    category: "economy",
    description: "Shows list of items",
    usage: " ",
    accessableby: "everyone"
    ,
    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${mesage.guild.id}`);
        if (!prefix) {
            prefix = default_prefix;
        }
        let embed = new EmbedBuilder()
            .setDescription(`** SHOP: **\n PadLock: \`500$\`\n you can use padlock to keep your wallet safe [${prefix}buy/${prefix}sell PadLock]\n\n LapTop: \`800$\`
 you can use laptop to earn some money online 💰
[${prefix}buy/${prefix}sell Laptop] \n\nFishing Rod: \`1600$\` 
 you can buy some fish and earn some money. 
[${prefix}buy/${prefix}sell Fishing Rod]\n\nHunting Rifle: \`2000$\`
 with hunting rifle you can catch some animal and earn money . [${prefix}buy/${prefix}sell Hunting Rifle]\n\nBank Note: \`2600$\`
 you can increase storage of your bank to 100 to 5000. [${prefix}buy/${prefix}sell Bank Note]
 `)
            .setColor("Blue")
            .setFooter({ text: `Requested By ${message.author.username}` })
        message.channel.send({ embeds: [embed] })
    }
}