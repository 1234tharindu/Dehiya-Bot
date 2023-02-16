const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js")
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add user to a ticket')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user who wants to add to the ticket')
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.channel.parent.name.toLowerCase() !== 'ticket area') return;
        const user = interaction.options.getUser('user');
        const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`${user} was added to this ticket`);

        interaction.channel.permissionOverwrites.edit(user.id, { ViewChannel: true, SendMessages: true });
        db.push(`tickets_${interaction.channel.id}.invited`, user.id);

        interaction.channel.send({ embeds: [embed] });
        interaction.reply({ content: 'DONE', ephemeral: true });
    }
};