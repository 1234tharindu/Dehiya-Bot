const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'verify-answer'
    },
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('verify-captcha')
            .setTitle('Get Verify ✅')
        const row = new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId('captcha')
                    .setLabel('Enter the captcha')
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(8)
                    .setMaxLength(8)
                    .setPlaceholder('Ax75Efd6')
                    .setRequired(true)
            )

        modal.addComponents(row);
        await interaction.showModal(modal);
    }
};