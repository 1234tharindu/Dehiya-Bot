const db = require('quick.db');

module.exports = {
    name: "ticketcountreset",
    run: async (client, message) => {
        await db.set(`TicketNumber_${message.guild.id}`, 0);
        message.channel.send(`Sucesfully Reseted the Ticket Count by `)
    }
}