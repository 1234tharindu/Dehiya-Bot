const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: 'verify-captcha'
    },
    async execute(interaction, client) {
        let captchaIncorrect = new EmbedBuilder()
            .setTitle("❌ You Failed to Complete the CAPTCHA!")
            .setDescription(`${interaction.user}, you failed to solve the CAPTCHA!\n\nCAPTCHA Text: **${captcha.text}**`)
            .setTimestamp()
            .setColor("Red")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }));


        let captchaCorrect = new EmbedBuilder()
            .setTitle("✅ CAPTCHA Solved!")
            .setDescription(`${interaction.user}, you completed the CAPTCHA successfully, and you have been given access to **${member.guild.name}**!`)
            .setTimestamp()
            .setColor("Green")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        await interaction.reply({ content: `Your input is ${interaction.fields.getTextInputValue('captcha')}`, ephemeral: true });
    }
};