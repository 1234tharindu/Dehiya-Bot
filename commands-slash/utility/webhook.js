const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('webhook')
    .setDescription('Makes a webhook to impersonate someone')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageWebhooks)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Webhook user')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel which going to send the webhook')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Webhook message')
        .setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message');
    const webhook = await channel.createWebhook(user.displayName, {
      avatar: user.user.displayAvatarURL(),
    });

    await webhook.send(message);
  }
};