const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "uptime",
  category: "info",
  description: "Shows Bot's Uptime.",
  usage: "uptime",

  run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let embed = new EmbedBuilder()
      .setDescription(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`)
      .setColor("Random")
      .setAuthor({
        name: `${client.user.username}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setFooter({ text: `Requested by ${message.author.username}` })

    return message.channel.send({ embeds: [embed] });
  }

}