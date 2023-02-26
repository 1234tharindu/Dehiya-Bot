const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "uncaughtException",
    async execute(err, client) {
        console.log("Uncaught Exception:\n", err);

        let ErrorLoggingChannel = await client.db.get(`ErrorLoggingChannel_${client.config.guildId}`);
        if (!ErrorLoggingChannel)
            return console.log(
                `Setup Is Not Done in ${guild} aka ${guild} Guild (channel not found)`
            );

        const exceptionembed = new EmbedBuilder()
            .setTitle("Uncaught Exception")
            .setDescription(`\`\`\`${require('util').inspect(err)}\`\`\``)
            .setColor("Red");
        client.channels.cache.get(ErrorLoggingChannel).send({ embeds: [exceptionembed] });
    },
}