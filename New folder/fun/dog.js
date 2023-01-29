const { EmbedBuilder } = require("discord.js");
const superagent = require("snekfetch");

module.exports = {
  name: "dog",
  category: "fun",
  description: "Sends a random dog image",
  usage: "[command]",
  run: async (client, message) => {
    //command
    superagent.get('https://nekos.life/api/v2/img/woof')
      .end((err, response) => {
        const lewdembed = new EmbedBuilder()
          .setTitle("Random Dog")
          .setImage(`${response.body.url}`)
          .setColor(`#000000`)
          .setFooter({ text: `🤣WHAT A DOG🤣` })
          .setURL(`${response.body.url}`);
        message.channel.send({ embeds: [lewdembed] });
      })
  }
};