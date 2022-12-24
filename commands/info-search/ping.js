const discord = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, message, args) => {
    let embed = new discord.EmbedBuilder()
      .setDescription(`Pong - ${client.ws.ping}ms`)
      .setColor("RANDOM")
      .setAuthor("ICSL-Bot")
      .setFooter(`Requested by ${message.author.username}`);

    message.channel.send(embed);
  },
};
