let backup = require("@outwalk/discord-backup");
const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("backup-load")
        .setDescription("load a server backup")
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

        const backupID = interaction.options.getInteger('backupid');
        backup.fetch(backupID).then(() => {
            const embed = new EmbedBuilder()
                .setTitle("Read below")
                .setDescription(
                    ':warning: All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!'
                )
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setFooter({
                    text: `${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
            interaction.reply({ embeds: [embed] });

            const collector = interaction.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
                time: 60000,
                max: 1
            });
            collector.on('collect', (m) => {
                const confirm = m.content === '-confirm';
                collector.stop();
                if (confirm) {
                    backup.load(backupID, interaction.guild).then(() => {
                        const embed1 = new EmbedBuilder()
                            .setTitle("Read below")
                            .setDescription(
                                "<a:tickYes:904236251190788116> Backup loaded successfully! "
                            )
                        return interaction.author.send({ embeds: [embed1] });

                    }).catch((err) => {

                        if (err === 'No backup found')
                            return interaction.reply({ content: ':x: No backup found for ID ' + backupID + '!', ephemeral: true });
                        else
                            return interaction.reply({ content: ':x: An error occurred: ' + (typeof err === 'string') ? err : JSON.stringify(err), ephemeral: true });
                    });
                } else {
                    return interaction.reply({ content: ':x: Cancelled.', ephemeral: true });
                }
            })

            collector.on('end', (collected, reason) => {
                if (reason === 'time')
                    return interaction.reply({ content: ':x: Command timed out! Please retry.', ephemeral: true });
            })

        }).catch(() => {
            return interaction.reply({ content: ':x: No backup found for ID ' + backupID + '!', ephemeral: true });
        });
    }
}