const { Events } = require('discord.js');
module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        const command = client.slashCommands.get(interaction.commandName);
        if (interaction.isChatInputCommand()) {

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            };
        } else if (interaction.isAutocomplete()) {

            if (!command) return;

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    }
};