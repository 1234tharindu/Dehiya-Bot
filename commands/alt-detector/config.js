const db = require("quick.db");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "config",
  aliases: ["config"],
  description: "sets config",
  category: "alt-detector",
  run: async (client, message) => {
    const args = message.content.split(" ").slice(1);

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      await message.delete()
      return message.channel.send(`**You Dont Have Permission To Use This Command**`)
    }

    const config = new EmbedBuilder()
      .setTitle(`CONFIG`)
      .setDescription(`
✨ \`s!config logChannel\` - ( **__Sets The logging Channel__** )
__VARIABLES__
\`s!config logchannel #alt-notify\`
✨ \`s!config errorlogChannel\` - ( **__Sets The Error logging Channel__** )
__VARIABLES__
\`s!config errorlogchannel #alt-notify\`
✨ \`s!config ticketchannel\` - ( **__Sets The Ticket Channel__** )
__VARIABLES__
\`s!config ticketchannel #alt-notify\`
✨ \`s!config notifyRole\` - ( **__Sets The Notify Role__** )
__VARIABLES__
\`s!config notifyrole @alt-notify\`
✨ \`s!config autokick\` - ( **__Sets AutoKick Configs__** )
__VARIABLES__
\`s!config autokick enable\` (To Enable AutoKick)
\`s!config autokick disable\` (To Disable Autokick)
\`s!config autokick set 7\` (To Kick Alts Below The Number Of Days Setted)
✨ \`s!config whitelist\` - ( **__Set The Whitelist User__** )
__VARIABLES__
\`s!config whitelist {user id}\` (AutoKick System Will Not Kick That User)
✨ \`s!config remove\` - ( **__Removes The Specific Config__** )
__VARIABLES__
\`s!config remove logchannel\` (Removes Alt Logging Channel)
\`s!config remove errorlogchannel\` (Removes Error Logging Channel)
\`s!config remove ticketchannel\` (Removes Ticket Channel)
\`s!config remove notifyrole\` (Removes Alt Notify Role)
\`s!config remove autokickage\` (Removes AutoKick Age)
\`s!config remove whitelist\` (Removes Whitelist User)
  `)
      .setColor(`Random`)

    if (args[0] === undefined) {
      return message.reply({ embeds: [config], allowedMentions: { repliedUser: false } })
    }

    if (args[0].toLowerCase() === "logchannel") {
      args.shift();

      let LoggingChannel = message.mentions.channels.first();

      if (!LoggingChannel)
        return message.channel.send(`**PLEASE MENTION A VALID CHANNEL**`);


      const success = new EmbedBuilder()
        .setTitle(`Alt Logging Channel has been Setted!`)
        .setDescription(`New Channel is ${LoggingChannel}`)
        .setThumbnail(message.guild.iconURL())
        .setFooter({ text: "Bot Made By ! Chirath#5959" });

      db.delete(`LoggingChannel_${message.guild.id}`);

      db.set(`LoggingChannel_${message.guild.id}`, LoggingChannel.id);

      message.reply({ embeds: [success], allowedMentions: { repliedUser: false } });


    } else if (args[0].toLowerCase() === "ticketchannel") {
      args.shift();

      let TicketChannel = message.mentions.channels.first();

      if (!TicketChannel)
        return message.reply({ content: `**PLEASE MENTION A VALID CHANNEL**`, allowedMentions: { repliedUser: false } });


      const success = new EmbedBuilder()
        .setTitle(`Ticket Channel has been Setted!`)
        .setDescription(`New Channel is ${TicketChannel}`)
        .setThumbnail(message.guild.iconURL())
        .setFooter({ text: "Bot Made By ! Chirath#5959" });

      db.delete(`TicketChannel_${message.guild.id}`);

      db.set(`TicketChannel_${message.guild.id}`, TicketChannel.id);

      message.reply({ embeds: [success], allowedMentions: { repliedUser: false } });


    } else if (args[0].toLowerCase() === "errorlogchannel") {
      args.shift();

      let ErrorLoggingChannel = message.mentions.channels.first();

      if (!ErrorLoggingChannel)
        return message.reply({ content: `**PLEASE MENTION A VALID CHANNEL**`, allowedMentions: { repliedUser: false } });


      const success = new EmbedBuilder()
        .setTitle(`Error Logging Channel has been Setted!`)
        .setDescription(`New Channel is ${ErrorLoggingChannel}`)
        .setThumbnail(message.guild.iconURL())
        .setFooter({ text: "Bot Made By ! Chirath#5959" });

      db.delete(`ErrorLoggingChannel_${message.guild.id}`);

      db.set(`ErrorLoggingChannel_${message.guild.id}`, ErrorLoggingChannel.id);

      message.reply({ embeds: [success], allowedMentions: { repliedUser: false } });

    } else if (args[0].toLowerCase() === "notifyrole") {
      args.shift();

      let notifyRole = message.mentions.roles.first();

      if (!notifyRole)
        return
      message.reply({ content: `**PLEASE MENTION A VALID ROLE**`, allowedMentions: { repliedUser: false } });


      const success = new EmbedBuilder()
        .setTitle(`Alt Notify Role has been setted`)
        .setDescription(`New Role is ${notifyRole}`)
        .setThumbnail(message.guild.iconURL())
        .setFooter({ text: "Bot Made By ! Chirath#5959" })

      db.delete(`notifyRole_${message.guild.id}`);

      db.set(`notifyRole_${message.guild.id}`, notifyRole.id);
      message.reply({ embeds: [success], allowedMentions: { repliedUser: false } });


    } else if (args[0].toLowerCase(0) === "autokick") {
      args.shift();

      if (args[0] === "enable") {

        db.set(`AutoKick_${message.guild.id}`, true)
        db.set(`AutoKickAge_${message.guild.id}`, 8)
        message.channel.send(`**AutoKick Has Been __Enabled__** \nAutokick Age is \`8\` Days By Default`)

      } else if (args[0] === 'disable') {
        db.delete(`AutoKick_${message.guild.id}`)
        message.channel.send(`**AutoKick Has Been __Disabled__**`)

      } else if (args[0] === 'set') {

        let autokickage = Number(args[1])

        if (!autokickage) {
          return message.channel.send(`**Please Specify The AutoKick Age \n__IN FORMAT__ : 7 [FOR 7 DAYS]**`)
        }

        if (autokickage > 31) {
          return message.reply({
            content: `**Huh ! ${message.author} You Can't Set Age Above __\`31\`__ Days**`, allowedMentions: { repliedUser: false }
          })
        }

        const success = new EmbedBuilder()
          .setTitle(`AutoKick Age has been Setted!`)
          .setDescription(`New AltAge is \`${autokickage}\` Days`)
          .setThumbnail(message.guild.iconURL())
          .setFooter({ text: "Bot Made By ! Chirath#5959" });

        message.reply({ embeds: [success], allowedMentions: { repliedUser: false } });

        db.delete(`AutokickAge_${message.guild.id}`)
        db.set(`AutokickAge_${message.guild.id}`, autokickage)
      }

    } else if (args[0].toLowerCase() === "whitelist") {
      args.shift()


      let Whitelist = args[0]

      if (!Whitelist) return message.channel.send(`**Please Tell The WhiteList User ID To Set**`)

      if (isNaN(Whitelist)) return message.channel.send(`**Please Tell The Valid ID \nFor Example \`!config whiteList 533955330829451275\`**`)

      db.delete(`WhiteListed_${message.guild.id}`)
      db.set(`WhiteListed_${message.guild.id}`, Whitelist)

      let whitelisted = new EmbedBuilder()
        .setTitle(`NEW WHITELIST USER SETTED`)
        .setDescription(`
    __Some Details About User__
**__ID__** - ${Whitelist}
***__NOTE__*** - **YOU CAN ONLY SET ONE WHITELIST USER ID THE PREVIOUS ID WILL BE DELETED AUTOMATICALLY**`)
      message.reply({ embeds: [whitelisted], allowedMentions: { repliedUser: false } })

    } else if (args[0].toLowerCase() === "remove") {
      args.shift()

      if (args[0].toLowerCase(0) === 'logchannel') {
        db.delete(`LoggingChannel_${message.guild.id}`)
        message.channel.send(`**Logging Channel Has Been Removed**`)
      }

      if (args[0].toLowerCase(0) === 'errorlogchannel') {
        db.delete(`ErrorLogChannel_${message.guild.id}`)
        message.channel.send(`**Logging Channel Has Been Removed**`)
      }

      if (args[0].toLowerCase(0) === 'ticketchannel') {
        db.delete(`TicketChannel_${message.guild.id}`)
        message.channel.send(`**Logging Channel Has Been Removed**`)
      }

      if (args[0].toLowerCase() === "notifyrole") {
        db.delete(`notifyRole_${message.guild.id}`)
        message.channel.send(`**NotifyRole Has Been Removed**`)
      }

      if (args[0].toLowerCase() === "autokickage") {
        db.delete(`AutoKickAge_${message.guild.id}`)
        message.channel.send(`**AutoKick Age Has Been Removed**  \n**But Its \`8\` By Default**`)
      }

      if (args[0].toLowerCase() === "whitelist") {
        db.delete(`WhiteListed_${message.guild.id}`)
        message.channel.send(`**WhiteList User Has Been Removed**`)
      }

    } else message.reply({ conten: "Unknown config variable...", allowedMentions: { repliedUser: false } })

  }


};