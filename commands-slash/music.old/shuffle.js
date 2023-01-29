const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Show detailed stats of bot')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new EmbedBuilder()
            .setColor('#FF5757')
            .setDescription(`You need to be in a vc to execute this command!`)
        if (!voice_channel) return message.channel.send(embed);
        let songs = client.player.shuffle(message);
        const shuffle = new EmbedBuilder()
            .setColor('#85b0d2')
            .setDescription('Server Queue was shuffled.')
        if (songs)
            message.channel.send(shuffle);
    }
}