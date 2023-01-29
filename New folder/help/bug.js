const { EmbedBuilder } = require("discord.js");
const { staffChat } = require("../../config.json");

module.exports = {
  name: "bug",
  category: "moderation",
  args: true,
  description:
    "Please specify the bug. Example:\n`punch isn't working. It isn't mentioning the user I'm trying to punch`",
  usage:
    "Please specify the bug. Example:\n`punch isn't working. It isn't mentioning the user I'm trying to punch`",
  run: async (client, message, args) => {
    // again make this fit your command handler style 😀
    args = args.join(" ");
    const channels = message.channel;
    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }
    message.reply(
      "Thanks for submitting a bug!, we will check your report\nwe will DM you when this bug is resolved\nplease also activate DM permissions all"
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : ${message.author.username}`
      })
      .then(InviteCode =>
        client.channels.cache.get(`${staffChat}`).send({
          embeds: [
            new EmbedBuilder()
              .setTitle("New Report Bug")
              .addFields([
                {
                  name: "User Name",
                  value: `**${message.author.username}#${message.author.discriminator}**`
                },
                { name: "ID User", value: message.author.id },
                { name: "Reported", value: args },
                { name: "Server Name", value: `**${message.guild.name}**` },
                { name: "ID Server", value: `**${message.guild.id}**` },
                { name: "USER SEARCH", value: `**[Click Here](https://discordapp.com/users/${message.guild.id}/)**` },
                { name: `Link Server`, value: `https://discord.gg/${InviteCode.code}` },
              ])
              .setColor("Random")
          ]
        }
        )
      );
  }
};