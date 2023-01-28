const { EmbedBuilder } = require("discord.js");
const random = require("something-random-on-discord").Random;

module.exports = {
  name: "hug",
  category: "fun",
  description: "Hug someone",
  run: async (client, message) => {

    let target = message.mentions.members.first()
    if (!target) {
      return message.channel.send("mention who wants you to hug")
    }

    let data = await random.getAnimeImgURL("hug");

    let embed = new EmbedBuilder()
      .setImage(`${data}`)
      .setColor("Random")
      .setFooter({ text: `${message.author.username} hugs ${target.user.username}` })
      .setTimestamp()

    message.channel.send({ embeds: [embed] });
  }
};