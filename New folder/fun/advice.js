const { EmbedBuilder } = require("discord.js");

const random = require("something-random-on-discord").Random;

module.exports = {
  name: "advice",
  category: "fun",
  description: "Get some advice",
  run: async (client, message, args) => {

    let data = await random.getAdvice()

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(data.embed.description)
          .setColor('Random')
      ]
    })

  }
}