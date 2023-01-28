const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, message, args) => {
    let embed = new EmbedBuilder()
      .setDescription(`Pong - ${client.ws.ping}ms`)
      .setColor("Random")
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })

      .setFooter({ text: `Requested by ${message.author.username}` });

    message.channel.send({ embeds: [embed] });
  },
};
