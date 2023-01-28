const backup = require("@outwalk/discord-backup");
const { PermissionsBitField } = require('discord.js');
const path = require('path');

module.exports = {
    name: "backup-create",
    aliases: ["bc"],
    category: "backup",
    usage: "backup-create",
    description: "create a backup",
    run: async (client, message) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
        }

        backup.create(message.guild).then((backupData) => {

            backup.setStorageFolder(path.join(process.cwd(), "backups.old"));

            return message.channel.send('Backup created! Here is your ID: `' + backupData.id + '` Use `load-backup ' + backupData.id + '` to load the backup on another server!');

        }).catch((err) => {
            console.log(err)
            return message.channel.send(':x: An error occurred, please report to the Support server ');

        });

    }
}