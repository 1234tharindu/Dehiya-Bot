const random = require("something-random-on-discord").Random;
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "neko",
  category: "Image",
  description: "Get some neko images",
  run: async (client, message) => {

    let data = await random.getNeko()
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(data.embed.color)
          .setTitle(data.embed.title)
          .setImage(data.embed.image.url)
      ]
    })
  }
}