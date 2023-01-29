const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disable-loop')
        .setDescription('Disable the loop'),
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new EmbedBuilder()
            .setColor('#FF5757')
            .setDescription(`You need to be in a vc to execute this command!`)
        if (!voice_channel) return message.channel.send(embed);
        // Disable repeat mode
        let status = client.player.setQueueRepeatMode(message, false);

        const disloop = new EmbedBuilder()
            .setColor('#85b0d2')
            .setDescription(`Queue will not be longer repeated indefinitely!`)
        if (status === null)
            return;
        message.channel.send(disloop);
    }
}