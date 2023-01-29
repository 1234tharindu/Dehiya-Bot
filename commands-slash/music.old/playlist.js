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
        // If maxSongs is -1, will be infinite.
        await client.player.playlist(message, {
            search: args.join(' '),
            maxSongs: -1
        });
    }
}