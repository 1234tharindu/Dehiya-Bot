const backup = require("@outwalk/discord-backup");
const backups = backup.list();
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "backups",
    aliases: ["bc"],
    category: "backup",
    usage: "backup",
    description: "list the backups",
    run: async (client, message) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
        }

        if (backups.length < 1) {
            return message.channel.send("No backups found")
        }
        const embed = new EmbedBuilder()
            .setColor("00ffff")
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTitle("___Backup List___")

        for (let i of backups) {
            embed.addFields([{ name: `\u200b`, value: `• ${i}` }])
        }

        message.channel.send({ embeds: [embed] });
    }
}