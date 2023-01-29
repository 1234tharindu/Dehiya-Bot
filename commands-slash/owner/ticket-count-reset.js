const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketcountreset')
        .setDescription('Reset the ticket count')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    execute: async (interaction) => {
        if (message.author.id != 771639970854731808) {
            const noperms = new EmbedBuilder()
                .setDescription("<:astroz_wrong:825598313499459605> This Command Only Use By My Owner **NPG** ")
                .setColor("YELLOW");
            return message.channel.send(noperms)
        }
        await db.set(`TicketNumber_${interaction.guild.id}`, 0);
        interaction.reply(`Successfully Reset the Ticket Count`)
    }
}