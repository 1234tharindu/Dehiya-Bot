const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("quick.db");

module.exports = {

    name: "removemoney",
    aliases: ["rm"],
    category: "economy",
    description: "Removes money from a user",
    usage: "[ mention | ID]",
    accessableby: "Administrator, Owner"
    ,
    run: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("❌ You do not have permissions to remove money!");
        if (!args[0]) return message.channel.send("**Please Enter A User!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Enter A Valid User!**")

        if (!args[1]) return message.channel.send("**Please Enter A Amount!**")
        if (isNaN(args[1])) return message.channel.send("**Enter Valid Amount!**");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("**Cannot Remove That Much Money!**")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`✅ Removed ${args[1]} coins\n\nNew Balance: ${bal2}`);
        message.channel.send({ embeds: [moneyEmbed] })

    }
}