const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Change the volume of song')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new EmbedBuilder()
            .setColor('#FF5757')
            .setDescription(`You need to be in a vc to execute this command!`)
        if (!voice_channel) return message.channel.send(embed);
        let isDone = client.player.setVolume(message, parseInt(args[0]));
        const volume = new EmbedBuilder()
            .setColor('#85b0d2')
            .setDescription(`Volume set to ${args[0]}%!`)
        if (isDone)
            message.channel.send(volume);
    }
}