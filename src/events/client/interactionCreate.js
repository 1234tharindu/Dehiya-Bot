const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        const command = client.commands.get(interaction.commandName);
        if (interaction.isChatInputCommand()) {
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            };

        } else if (interaction.isAutocomplete()) {

            if (!command) return;

            try {
                await command.autocomplete(interaction, client);
            } catch (error) {
                console.error(error);
            }

        } else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (!button) return console.error("There is no code for this button");

            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error(error);
            };
        } else if (interaction.isStringSelectMenu()) {
            const menu = client.selectMenus.get(interaction.customId);
            if (!menu) return console.error("There is no code for this select menu");

            try {
                await menu.execute(interaction, client);
            } catch (error) {
                console.error(error);
            };
        } else if (interaction.isModalSubmit()) {
            const modal = client.modals.get(interaction.customId);
            if (!modal) return console.error("There is no code for this modal");
            try {
                await modal.execute(interaction, client);
            } catch (error) {
                console.error(error);
            };
        } else if (interaction.isContextMenuCommand()) {
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
            };
        }
    }
};