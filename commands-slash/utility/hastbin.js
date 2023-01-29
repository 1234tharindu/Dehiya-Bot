const discord = require("discord.js");
const { RichEmbed, SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const sourcebin = require("sourcebin_js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('haste')
    .setDescription('haste <code/text>'),

  run: async (client, message, args) => {
    message.delete();
    const Content = args.join(" ");
    sourcebin
      .create([
        {
          title: "JavaScript code",
          description: 'This code was created in "' + message.createdAt + '"',
          name: "Made By " + message.author.username,
          content: Content,
          languageId: "JavaScript"
        }
      ])
      .then(src => {
        let embed = new discord.EmbedBuilder()
          .setTitle(`Hastebin`)
          .setColor("RANDOM")
          .setDescription(`Code:\n${Content}\n\n**[Click Here](${src.url})**`);
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel.send(`Error, try again later`);
      });
  }
};