const { EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  name: "math",
  category: "fun",
  run: async (client, message, args) => {
    try {
      if (!args[0]) return message.channel.send("Please Give Me Equation!");

      const embed = new EmbedBuilder()
        .setColor(`Random`)
        .setTitle(`Result`)
        .setDescription(`${math.evaluate(args.join(" "))}`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send(`Please Give Me Valid Equation | Try Again Later!`).then(() => console.log(error));
    }
  }
};