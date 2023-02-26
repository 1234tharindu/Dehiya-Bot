const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "unhandledRejection",
    async execute(reason, promise, client) {
        let ErrorLoggingChannel = await client.db.get(`ErrorLoggingChannel_${client.config.guildId}`);
        if (!ErrorLoggingChannel)
            return console.log(
                `Setup Is Not Done in ${guild} aka ${guild} Guild (channel not found)`
            );

        console.log(
            "[FATAL] Possibly Unhandled Rejection at: ",
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
        setTimeout(() => {
            client.channels.cache.get(ErrorLoggingChannel).send({ embeds: [rejectionembed] });
        }, 5000);
    },
}