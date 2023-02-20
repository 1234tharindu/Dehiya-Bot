const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns latency and API ping'),

  async execute(interaction, client) {
    let embed = new EmbedBuilder()
      .setDescription(`Pong - ${client.ws.ping}ms`)
      .setColor("Random")
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setFooter({ text: `Requested by ${interaction.user.username}` });

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
