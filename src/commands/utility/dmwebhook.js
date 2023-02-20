const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dmwebhook')
    .setDescription('Makes a webhook to impersonate someone')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageWebhooks),

  run: async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_WEBHOOKS")) {
      return message.channel.send(`You Don't Have Permission To Use This Command! Manage webhook`)
    }


    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Please provide a user!");

    const webhook = await user.createWebhook(user.displayName, {
      avatar: user.user.displayAvatarURL(),

    });
    await webhook.send(args.slice(1).join(" "));
  }
};