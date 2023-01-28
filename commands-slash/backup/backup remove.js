const { PermissionsBitField, SlashCommandBuilder } = require("discord.js");
let backup = require("@outwalk/discord-backup");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('backup-remove')
        .setDescription("remove a backup")
        .addStringOption(option => option.setName('backupid').setDescription('Backup ID')
            .setRequired(true)
            .setAutocomplete(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async autocomplete(interaction) {
        backup = require("@outwalk/discord-backup");
        let backups = backup.list();

        const focusedValue = interaction.options.getFocused();
        const choices = backups;
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },

    async execute(interaction) {
        backup = require("@outwalk/discord-backup");

        const backupID = interaction.options.getString('backupid');
        backup.remove(backupID);
        return interaction.reply('Successfully removed `' + backupID + '` from the backup list')
    }
}