const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loop the current song'),
    async execute(interaction) {
        const voice_channel = interaction.member.voice.channel;
        const embed = new EmbedBuilder()
            .setColor('#FF5757')
            .setDescription(`You need to be in a vc to execute this command!`)
        if (!voice_channel) return interaction.reply({ embeds: [embed], ephemeral: true });
        // Enable repeat mode
        let status = client.player.setQueueRepeatMode(message, true);
        const loop = new EmbedBuilder()
            .setColor('#85b0d2')
            .setDescription(`Queue will be repeated indefinitely!`)
        if (status === null)
            return;
        interaction.channel.send({ embeds: [loop] });
    }
}