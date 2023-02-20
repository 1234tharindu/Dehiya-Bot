const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Returns button and API ping'),

    async execute(interaction) {
        let button = new ButtonBuilder()
            .setLabel('TEST')
            .setCustomId('test-button')
            .setStyle(ButtonStyle.Primary);

        interaction.reply({ components: [new ActionRowBuilder().addComponents(button)], ephemeral: true });
    },
};
