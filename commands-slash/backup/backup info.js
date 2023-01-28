const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require("discord.js");
let backup = require("@outwalk/discord-backup");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('backup-info')
        .setDescription("get the info of backup")
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

        const backupID = parseInt(interaction.options.getString('backupid'));
        await backup.fetch(backupID).then((backup) => {
            const date = new Date(backup.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
            const formattedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;

            const embed = new EmbedBuilder()
                .setColor("00ffff")
                .setAuthor({ name: 'Backup', iconURL: backup.data.iconURL })
                .addFields([
                    { name: 'Server name', value: backup.data.name },
                    { name: 'Size', value: `${backup.size}kb` },
                    { name: 'Created at', value: formattedDate },
                ])
                .setFooter({ text: `Backup ID: ${backup.id}` });
            return interaction.reply({ embeds: [embed] });

        }).catch((err) => {
            if (err === 'No backup found')
                return interaction.reply({ content: ':x: No backup found for ID ' + backupID + '!', ephemeral: true });
            else
                return interaction.reply({ content: ':x: An error occurred: ' + (typeof err === 'string') ? err : JSON.stringify(err), ephemeral: true });
        });
    }
}
