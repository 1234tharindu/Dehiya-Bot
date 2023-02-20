const { ActionRowBuilder, StringSelectMenuOptionBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Return a select menu'),
    async execute(interaction, client) {
        const menu = new StringSelectMenuBuilder()
            .setCustomId('test-menu')
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(
                new StringSelectMenuOptionBuilder({
                    label: 'Option 01',
                    value: 'this is option the 1',
                }),
                new StringSelectMenuOptionBuilder({
                    label: 'Option 02',
                    value: 'this is option the 2'
                })
            );
        interaction.reply({ content: 'test menu', components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true })
    }
}