const { EmbedBuilder } = require("discord.js");
const random = require("something-random-on-discord").Random;

module.exports = {
  name: "pat",
  category: "fun",
  description: "Pat someone",
  run: async (client, message) => {

    let target = message.mentions.members.first()
    if (!target) {
      return message.channel.send("mention who wants you to pat")
    }

    let data = await random.getAnimeImgURL("pat");

    let embed = new EmbedBuilder()
      .setImage(`${data}`)
      .setColor("Random")
      .setFooter({ text: `${message.author.username} pats ${target.user.username}` })
      .setTimestamp()

    message.channel.send({ embeds: [embed] });
  }
};