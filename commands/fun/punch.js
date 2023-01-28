const { EmbedBuilder } = require("discord.js");
const random = require("something-random-on-discord").Random;

module.exports = {
  name: "punch",
  category: "fun",
  description: "Punch someone",
  run: async (client, message) => {

    let target = message.mentions.members.first()
    if (!target) {
      return message.channel.send("mention who wants you to punch")
    }

    let data = await random.getAnimeImgURL("punch");

    let embed = new EmbedBuilder()
      .setImage(`${data}`)
      .setColor("Random")
      .setFooter({ text: `${message.author.username} punches ${target.user.username}` })
      .setTimestamp()

    message.channel.send({ embeds: [embed] });
  }
};
