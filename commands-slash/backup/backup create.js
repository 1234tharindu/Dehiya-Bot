const backup = require("@outwalk/discord-backup");
const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("backup-create")
        .setDescription("create a backup")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {
        return console.log(interaction.guild)
        backup.create(interaction.guild).then((backupData) => {
            backup.setStorageFolder(path.join(process.cwd(), "backups.old"));
            return interaction.reply('Backup created! Here is your ID: `' + backupData.id + '` Use `load-backup ' + backupData.id + '` to load the backup on another server!');

        }).catch((err) => {
            console.log(err)
            return interaction.reply(':x: An error occurred, please report to the Support server ');

        });
    }
}