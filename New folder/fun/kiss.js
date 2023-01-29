const random = require("something-random-on-discord").Random;
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kiss",
  category: "fun",
  description: "Kiss someone",
  run: async (client, message) => {

    let target = message.mentions.members.first()
    if (!target) {
      return message.channel.send("mention who wants you to kiss")
    }

    let data = await random.getAnimeImgURL("kiss");

    let embed = new EmbedBuilder()
      .setImage(`${data}`)
      .setColor("Random")
      .setFooter({ text: `${message.author.username} kisses ${target.user.username}` })
      .setTimestamp()

    message.channel.send({ embeds: [embed] });
  }
};