const discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const config = require("../../config");
const guildDB = require("../../mongo/guildDB");
module.exports = {
  name: "greetmsg",
  description: "Toogles greet system",
  usage: ``,
  category: "utility",
  aliases: ["greet"],
  run: async (client, message, args) => {
    message.delete().catch(() => { });

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(`:x: Missing Permission`)

    let db = await greetDB.find({ guild: message.guild.id });

    if (!args[0])
      return message.channel.send(
        new discord.EmbedBuilder().setColor("00FFFF").setDescription(
          `<:GlobalCross:772424814824390677> **You Didn't Provided New Join Messages , Check Below For More Help.**

**__Variables that can be used in greet messages__**
\`[member:mention]\` **=>** \`pings member\`
\`[guild:name]\` **=>** \`displays guild name\`
\`[guild:membercount]\` **=>** \`displays guild membercount\`

**__Current Greet Message__**
${db.Message || "[member:mention] Welcome to [guild:name]"}
`
        )
      );
    if (!db) {
      let newDB = new guildDB({
        guild: message.guild.id,
        message: args.slice(0).join(" "),
        channel: null,
      });
      await newDB.save();
      let m = await message.channel.send(
        new discord.EmbedBuilder()
          .setDescription(`**Changed Greet Message**`)
          .setColor("00FFFF")
      );
      setTimeout(() => {
        m.delete().catch(() => { });
      }, 3000);
    } else {
      db.Message = args.slice(0).join(" ");
      await db.save();
      let m = await message.channel.send(
        new discord.EmbedBuilder()
          .setDescription(`**Changed Greet Message**`)
          .setColor("00FFFF")
      );
      setTimeout(() => {
        m.delete().catch(() => { });
      }, 3000);
    }
  }
};