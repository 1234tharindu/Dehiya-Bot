const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder, ChannelType } = require("discord.js");
let cooldown = new Set();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autosetup')
    .setDescription("autosetup the bot")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild),

  async execute(interaction, client) {
    const { db } = client;

    if (cooldown.has(interaction.user.id)) {
      interaction.reply({ embed: { color: "#10de47", description: `**You need to wait __${config.COOLDOWN}__ minutes to use this command again!**` }, ephemeral: true });
    } else {

      let embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle("AUTO SETUP")
        .setTimestamp()
        .setFooter({ text: "Bot Made By ! Chirath#5959" });

      let xd = await interaction.reply({ embeds: [embed] })
      xd.react("✅")
      xd.react("❌")

      const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === interaction.user.id;
      };

      xd.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(async collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === '✅') {
            let channel = client.channels.cache.find(x => x.name === "alt-logging")
            if (channel) {
              channel.delete().catch(console.log)
            }
            await interaction.guild.channels.create({
              name: 'alt-logging',
              type: ChannelType.GuildText,
              permissionsOverwrites: [{
                id: interaction.guild.id,
                deny: PermissionsBitField.Flags.SendMessages,
                allow: PermissionsBitField.Flags.ViewChannel,
              }]
            })
            let role = interaction.guild.roles.cache.find(role => role.name === "alt-notify")
            if (role) {
              role.delete().catch(console.log)
            }
            await interaction.guild.roles.create({
              data: {
                name: 'alt-notify',
                color: 'Random',
              }
            })

            let LoggingChannel = client.channels.cache.find(x => x.name === "alt-logging")
            await db.set(`LoggingChannel_${interaction.guild.id}`, LoggingChannel.id)

            let notifyRole = interaction.guild.roles.cache.find(role => role.name === "alt-notify")
            await db.set(`notifyRole_${interaction.guild.id}`, notifyRole)
            interaction.reply({ comtent: 'done', allowedMentions: { repliedUser: false } })
            let AutoSetupEmbed = new EmbedBuilder()
              .setColor("Random")
              .setDescription(`**__DOING AUTOSETUP__** \n **Please Wait For While ....**`)
              .setFooter({ text: "Bot Made By ! Chirath#5959" });

            let AutoSetupDoneEmbed = new EmbedBuilder()
              .setColor("Random")
              .setDescription(`**__AUTO SETUP DONE__** \n **Now Alt Logging Channel is ${LoggingChannel} \n And Alt Notify Role is ${notifyRole}**`)
              .setFooter({ text: "Bot Made By ! Chirath#5959" });

            interaction = await
              interaction.reply(AutoSetupEmbed)
            setTimeout(() => {
              interaction.edit(AutoSetupDoneEmbed);
            }, 1000);
          } else {
            interaction.reply('Alright ! Process Has Been Cancelled');
          }
        })
        .catch(collected => {
          if (xd.reactions.cache.size !== null) return
          else interaction.reply(`Time Up ! You Didn't Reacted`);
        })
    }
    cooldown.add(interaction.user.id);
    setTimeout(() => {
      cooldown.delete(interaction.user.id);
    }, config.COOLDOWN * 60 * 1000);
  }

}