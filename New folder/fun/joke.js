const { EmbedBuilder } = require("discord.js");

const random = require("something-random-on-discord").Random;

module.exports = {
  name: "joke",
  category: "fun",
  description: "Get some fun jokes",
  run: async (client, message, args) => {

    let data = await random.getJoke()
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(data.embed.description)
          .setColor("Random")
      ]
    })
  }
}