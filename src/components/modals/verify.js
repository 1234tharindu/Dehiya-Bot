const { EmbedBuilder } = require("discord.js");
const { text } = require('../buttons/verify.js');

module.exports = {
    data: {
        name: 'verify-captcha'
    },
    async execute(interaction, client) {
        let captchaCorrect = new EmbedBuilder()
            .setTitle("✅ CAPTCHA Solved!")
            .setDescription(`${interaction.user}, you completed the CAPTCHA successfully, and you have been given access to **${member.guild.name}**!`)
            .setTimestamp()
            .setColor("Green")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

        let captchaIncorrect = new EmbedBuilder()
            .setTitle("❌ You Failed to Complete the CAPTCHA!")
            .setDescription(`${interaction.user}, you failed to solve the CAPTCHA!\n\nCAPTCHA Text: **${text}**`)
            .setTimestamp()
            .setColor("Red")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

        if (text === interaction.fields.getTextInputValue('captcha')) {
            interaction.reply({ embeds: [captchaCorrect], ephemeral: true });
        } else {
            interaction.reply({ embeds: [captchaIncorrect], ephemeral: true });

        }
    }
};