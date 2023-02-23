const { EmbedBuilder } = require('discord.js');
const db = require('quick.db').QuickDB;

module.exports = {
    name: "unhandledRejection",
    async execute() {
        let ErrorLoggingChannel = await db.get(`ErrorLoggingChannel_${guildId}`);
        if (!ErrorLoggingChannel)
            return console.log(
                `Setup Is Not Done in ${guild} aka ${guild} Guild (channel not found)`
            );

        console.log(
            "[FATAL] Possibly Unhandled Rejection at: Promise ",
            promise,
            " reason: ",
            reason.message
        );

        const rejectionembed = new EmbedBuilder()
            .setTitle("Unhandled Promise Rejection")
            .addFields([
                { name: "Promise", value: `\`\`\`${require('util').inspect(promise).slice(0, 1010)}\`\`\`` },
                { name: "Reason", value: `${reason.message}` }
            ])
            .setColor("Red");
        client.channels.cache.get('1020701827869716501').send({ embeds: [rejectionembed] });
    },
}