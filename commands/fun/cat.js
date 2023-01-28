const superagent = require("snekfetch");
const { EmbedBuilder } = require("discord.js");


module.exports = {
  name: "cat",
  category: "fun",
  description: "Sends a random image of a cat",
  usage: "[command]",
  run: async (client, message) => {
    //command
    superagent.get('https://nekos.life/api/v2/img/meow')
      .end((err, response) => {
        const lewdembed = new EmbedBuilder()
          .setTitle("Random Cat")
          .setImage(`${response.body.url}`)
          .setColor('Random')
          .setFooter({ text: `owo` })
          .setURL(`${response.body.url}`);
        message.channel.send({ embeds: [lewdembed] });
      })
  }
};