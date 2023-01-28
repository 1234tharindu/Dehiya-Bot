const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const backup = require("@outwalk/discord-backup");


module.exports = {
    name: 'backup-remove',
    aliases: [],
    category: 'backup',


    run: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply(':x: You need to have the administrator permissions to create a backup in this server.');
        }

        const backupID = args.join(' ');

        if (!backupID)
            return message.channel.send(':x: Please specify a valid backup ID!');

        backup.remove(backupID);
        return message.channel.send('Successfully removed `' + backupID + '` from the backup list')
    }
}