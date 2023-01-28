const backup = require("@outwalk/discord-backup");
const backups = backup.list();
const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("backups")
        .setDescription("list the backups")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {

        if (backups.length < 1) {
            return interaction.reply({ content: "No backups found", ephemeral: true, ephemeral: true })
        }
        const embed = new EmbedBuilder()
            .setColor("00ffff")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setTitle("___Backup List___")

        for (let i of backups) {
            embed.addFields([{ name: `\u200b`, value: `• ${i}` }])
        }

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}