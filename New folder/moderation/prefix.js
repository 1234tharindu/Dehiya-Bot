const { PermissionsBitField } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "prefix",
    category: "moderation",
    description: "prefix",
    run: async (client, message, args) => {
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send('I don\'t have the right permissions.')
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return message.channel.send("You Don't Have Permission!")
        }
        if (!args[0]) {
            return message.channel.send("You didn't enter the new prefix or `reset` to reset the prefix with the command")
        }
        if (args[0] == "reset") {
            db.delete(`prefix_${message.guild.id}`)
            return message.channel.send("Prefix reset !!")
        }
        const prefix = args[0];
        db.set(`prefix_${message.guild.id}`, prefix)
        message.reply(`My new prefix is \`${db.get(`prefix_${message.guild.id}`)}\``)
    }
}