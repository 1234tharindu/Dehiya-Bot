const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require('quick.db');
const { deleteDBItem } = require("../../utils/utils.js");
const utils = require('../../utils/utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('remove user from a ticket')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user who wants to remove from the ticket')
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.channel.parent.name.toLowerCase() !== 'ticket area') return;
        const user = interaction.options.getUser('user');
        const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`${user} was removed from this ticket`)

        interaction.channel.permissionOverwrites.delete(user.id);
        await deleteDBItem(await db.get(`tickets_${interaction.channel.id}.invited`), user.id)
            .then((newInvited) => {
                db.set(`tickets_${interaction.channel.id}.invited`, newInvited);
                interaction.channel.send({ embeds: [embed] });
                interaction.reply({ content: 'DONE', ephemeral: true });
            })
            .catch(err => {
                interaction.reply({ content: 'NOT FOUND', ephemeral: true });
            }
            );

    }
};