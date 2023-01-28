const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  category: "info",
  description: `INVITE Bot`,
  run: async (client, message) => {

    let embed = new EmbedBuilder()
      .setTitle(`Invite Me`)
      .setDescription(`• [Invite Me](https://discord.com/oauth2/authorize?client_id=906899294815145995&permissions=8&scope=bot%20applications.commands)`)
      .setColor("Random")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({
        text: `${client.user.username}`,
        iconURL: client.user.displayAvatarURL()
      });

    message.channel.send({ embeds: [embed] })


  }
}