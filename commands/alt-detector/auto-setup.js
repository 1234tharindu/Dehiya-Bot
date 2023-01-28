const { PermissionsBitField, EmbedBuilder, ChannelType } = require("discord.js");
const db = require("quick.db");
let cooldown = new Set();
const config = require("../../config")

module.exports = {
  name: "auto-setup",
  aliases: ['autosetup'],
  description: "autosetup the bot",
  category: "alt-detector",

  run: async (message) => {


    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      await message.delete()
      return message.channel.send(`**You Dont Have Permission To Use This Command**`)
    }

    if (cooldown.has(message.author.id)) {
      message = await
        message.reply({ embed: { color: "#10de47", description: `**You need to wait __${config.COOLDOWN}__ minutes to use this command again!**` } });
      setTimeout(() => {
        message.delete();
      }, 3000);
    } else {

      let embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle("AUTO SETUP")
        .setTimestamp()
        .setFooter({ text: "Bot Made By ! Chirath#5959" });

      let xd = await message.channel.send({ embeds: [embed] })
      xd.react("✅")
      xd.react("❌")

      const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      xd.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(async collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === '✅') {
            let channel = client.channels.cache.find(x => x.name === "alt-logging")
            if (channel) {
              channel.delete().catch(console.log)
            }
            await message.guild.channels.create({
              name: 'alt-logging',
              type: ChannelType.GuildText,
              permissionsOverwrites: [{
                id: message.guild.id,
                deny: PermissionsBitField.Flags.SendMessages,
                allow: PermissionsBitField.Flags.ViewChannel
              }]
            })
            let role = message.guild.roles.cache.find(role => role.name === "alt-notify")
            if (role) {
              role.delete().catch(console.log)
            }
            await message.guild.roles.create({
              data: {
                name: 'alt-notify',
                color: 'Random',
              }
            })

            let LoggingChannel = client.channels.cache.find(x => x.name === "alt-logging")
            await db.delete(`LoggingChannel_${message.guild.id}`)
            await db.set(`LoggingChannel_${message.guild.id}`, LoggingChannel.id)

            let notifyRole = message.guild.roles.cache.find(role => role.name === "alt-notify")
            await db.delete(`notifyRole_${message.guild.id}`)
            await db.set(`notifyRole_${message.guild.id}`, notifyRole)
            message.channel.send('done')
            let AutoSetupEmbed = new EmbedBuilder()
              .setColor("Random")
              .setDescription(`**__DOING AUTOSETUP__** \n **Please Wait For While ....**`)
              .setFooter({ text: "Bot Made By ! Chirath#5959" });

            let AutoSetupDoneEmbed = new EmbedBuilder()
              .setColor("Random")
              .setDescription(`**__AUTO SETUP DONE__** \n **Now Alt Logging Channel is ${LoggingChannel} \n And Alt Notify Role is ${notifyRole}**`)
              .setFooter({ text: "Bot Made By ! Chirath#5959" });

            message = await
              message.reply(AutoSetupEmbed)
            setTimeout(() => {
              message.edit(AutoSetupDoneEmbed);
            }, 1000);
          } else {
            message.reply('Alright ! Process Has Been Cancelled');
          }
        })
        .catch(collected => {
          if (xd.reactions.cache.size !== null) return
          else message.reply(`Time Up ! You Didn't Reacted`);
        })
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, config.COOLDOWN * 60 * 1000);
  }

}