const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const { execute } = require("../utility/sendembed");

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
        interaction.channel.send({ embeds: [embed] });
    }
};