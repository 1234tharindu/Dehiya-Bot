const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: {
        name: 'verify-captcha'
    },
    async execute(interaction, client) {
        const input = interaction.fields.getTextInputValue('captcha');
        const captchaText = await client.db.get(`verified_${interaction.guild.id}${interaction.user.id}`);
        await interaction.channel.messages
            .fetch({ message: await client.db.get(`verifyTemp_${interaction.guild.id}`) })
            .then(m => m.editReply({ content: '', components: [], ephemeral: true }));

        if (input == captchaText) {
            const role = await interaction.guild.roles.cache
                .find(async r => r.id = await client.db.get(`verifiedRole_${interaction.guild.id}`));
            let captchaCorrect = new EmbedBuilder()
                .setTitle("✅ CAPTCHA Solved!")
                .setDescription(`${interaction.user}, you completed the CAPTCHA successfully, and you have been given access to **${interaction.guild.name}**!`)
                .setTimestamp()
                .setColor("Green")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

            await interaction.member.roles.add(role);
            interaction.reply({ embeds: [captchaCorrect], ephemeral: true });

        } else {
            let captchaIncorrect = new EmbedBuilder()
                .setTitle("❌ You Failed to Complete the CAPTCHA!")
                .setDescription(`${interaction.user}, you failed to solve the CAPTCHA!\n\nCAPTCHA Text: **${captchaText}**`)
                .setTimestamp()
                .setColor("Red")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
            interaction.reply({ embeds: [captchaIncorrect], ephemeral: true });
        }
    }
};