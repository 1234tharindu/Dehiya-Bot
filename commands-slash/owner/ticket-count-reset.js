const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketcountreset')
        .setDescription('Reset the ticket count')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction) => {
        await db.set(`TicketNumber_${interaction.guild.id}`, 0);
        interaction.reply(`Successfully Reset the Ticket Count`)
    }
}