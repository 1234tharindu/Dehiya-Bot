const { EmbedBuilder } = require("discord.js");
const random = require("something-random-on-discord").Random;

module.exports = {
  name: "cry",
  category: "fun",
  description: "Cry with gif",
  run: async (client, message) => {

    let data = await random.getAnimeImgURL("cry");

    let embed = new EmbedBuilder()
      .setImage(data)
      .setColor("Random")
      .setFooter({ text: `Please talk with ${message.author.username} they are crying` })
      .setTimestamp()

    message.channel.send({ embeds: [embed] });
  }
};