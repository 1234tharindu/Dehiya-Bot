const { EmbedBuilder } = require('discord.js');
const db = require('quick.db').QuickDB;

module.exports = {
    name: "uncaughtException",
    async execute() {
        let ErrorLoggingChannel = await db.get(`ErrorLoggingChannel_${client.config.guildId}`);
        if (!ErrorLoggingChannel)
            return console.log(
                `Setup Is Not Done in ${guild} aka ${guild} Guild (channel not found)`
            );

        console.log(err);

        const exceptionembed = new EmbedBuilder()
            .setTitle("Uncaught Exception")
            .setDescription(`\`\`\`${require('util').inspect(err)}\`\`\``)
            .setColor("Red");
        client.channels.cache.get('1020701827869716501').send({ embeds: [exceptionembed] });
    },
}