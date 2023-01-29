const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { UniqueID } = require('nodejs-snowflake');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timedif')
        .setDescription('Differentiate time')
        .addStringOption(option =>
            option.setName('time1')
                .setDescription('Time 1')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time2')
                .setDescription('Time 2')
                .setRequired(true)),

    run: async (interaction) => {

        let time1 = interaction.options.getString('time1');
        let time2 = interaction.options.getString('time2');

        const uid = new UniqueID(time1);
        const t1 = uid.getTimestampFromID(time1);

        const uid2 = new UniqueID(time2);
        const t2 = uid2.getTimestampFromID(time2);

        const embed = new EmbedBuilder()
            .setTitle('Time Difference')
            .setColor("#1a8cff")
            .setDescription(`${(t2 - t1) / 1000} seconds`)
            .setFooter({ text: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}