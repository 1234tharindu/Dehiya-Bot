const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Bot joins to a vc'),

    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel;
        const embed = new EmbedBuilder()
            .setColor('#FF5757')
            .setDescription(`You need to be in a vc to execute this command!`)
        if (!voiceChannel) return message.channel.send(embed)
        voiceChannel.join()
        message.react('🪐')

    }
}