const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription("sets config")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
    .addSubcommand(subcommand =>
      subcommand
        .setName('logchannel')
        .setDescription('Sets The alt logging Channel')
        .addChannelOption(option => option.setName('channel').setDescription('alt logging channel')
          .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('errorlogchannel')
        .setDescription('Sets The Error logging Channel')
        .addChannelOption(option => option.setName('channel').setDescription('error log channel')
          .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('ticketchannel')
        .setDescription('Sets The Ticket Channel')
        .addChannelOption(option => option.setName('channel').setDescription('ticket message channel')
          .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('verifychannel')
        .setDescription('Sets The Verify Channel')
        .addChannelOption(option => option.setName('channel').setDescription('verify message channel')
          .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('ticketlogs')
        .setDescription('Sets The Ticket Logs Channel')
        .addChannelOption(option => option.setName('channel').setDescription('ticket logs channel')
          .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('notifyrole')
        .setDescription('Sets The Notify Role')
        .addRoleOption(option => option.setName('role').setDescription('alt notify role')
          .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('memberrole')
        .setDescription('Sets The Member Role (when member joined)')
        .addRoleOption(option => option.setName('role').setDescription('member role')
          .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('verifiedrole')
        .setDescription('Sets The Verified Role (when member verified)')
        .addRoleOption(option => option.setName('role').setDescription('verified role')
          .setRequired(true)))
    .addSubcommandGroup(subcommand =>
      subcommand
        .setName('autokick')
        .setDescription('Sets AutoKick Configs')
        .addSubcommand(subcommand =>
          subcommand
            .setName('enable')
            .setDescription('To Enable AutoKick'))
        .addSubcommand(subcommand =>
          subcommand
            .setName('disable')
            .setDescription('To Disable Autokick'))
        .addSubcommand(subcommand =>
          subcommand
            .setName('set')
            .setDescription('To Kick Alts Below The Number Of Days Setted')
            .addIntegerOption(option => option.setName('days').setDescription('Autokickage')
              .setMaxValue(31)
              .setRequired(true)))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('whitelist')
        .setDescription('AutoKick System Will Not Kick That User')
        .addIntegerOption(option => option.setName('userid').setDescription('Whitelist user ID')
          .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Removes The Specific Config')
        .addStringOption(option =>
          option.setName('config')
            .setDescription('config name')
            .setRequired(true)
            .setAutocomplete(true))
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = ['log channel', 'error log channel', 'ticket channel', 'ticket logs', 'notify role', 'verified role', 'member role', 'whitelist'];
    const filtered = choices.filter(choice => choice.startsWith(focusedValue));
    await interaction.respond(
      filtered.map(choice => ({ name: choice, value: choice })),
    );
  },

  async execute(interaction, client) {
    const { db } = client;
    const logchannel = interaction.guild.channels.cache.get(await db.get(`LoggingChannel_${interaction.guild.id}`));
    if (interaction.options.getSubcommand() && !interaction.options.getSubcommandGroup()) {
      switch (interaction.options.getSubcommand()) {
        case 'logchannel':
          const LoggingChannel = interaction.options.getChannel('channel');
          db.set(`LoggingChannel_${interaction.guild.id}`, LoggingChannel.id);
          const logSuccess = new EmbedBuilder()
            .setTitle(`Alt Logging Channel has been Setted!`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setTimestamp()
            .setColor('Yellow')
            .setDescription(`New Channel is ${LoggingChannel}`);
          interaction.reply({ embeds: [logSuccess] });
          logSuccess
            .addFields({ name: `Requested by`, value: `${interaction.user}` })
          logchannel.send({ embeds: [logSuccess] });
          break;


        case 'errorlogchannel':
          const ErrorLoggingChannel = interaction.options.getChannel('channel');
          db.set(`ErrorLoggingChannel_${interaction.guild.id}`, ErrorLoggingChannel.id);
          const errorSuccess = new EmbedBuilder()
            .setTitle(`Error Logging Channel has been Setted!`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setTimestamp()
            .setColor('Yellow')
            .setDescription(`New Channel is ${ErrorLoggingChannel}`);
          interaction.reply({ embeds: [errorSuccess] });
          errorSuccess
            .addFields({ name: `Requested by`, value: `${interaction.user}` })
          logchannel.send({ embeds: [errorSuccess] });
          break;


        case 'ticketchannel':
          const preTChannel = await db.get(`TicketChannel_${interaction.guild.id}`);
          if (preTChannel) {
            interaction.guild.channels.cache.get(preTChannel).messages
              .fetch({ message: await db.get(`TicketMsg_${interaction.guild.id}`) })
              .then(m => m.delete())
          }

          const TicketChannel = interaction.options.getChannel('channel');
          const ticketSuccess = new EmbedBuilder()
            .setTitle(`Ticket Channel has been Setted!`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setColor('Yellow')
            .setTimestamp()
            .setDescription(`New Channel is ${TicketChannel}`);

          const ticket = new EmbedBuilder()
            .setTitle('Ticket')
            .setDescription('To create a ticket react with 📩')
            .setColor('Blue')
            .setFooter({ text: `${interaction.guild.members.me.user.username}`, iconURL: interaction.guild.members.me.user.displayAvatarURL() });

          const row = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('createTicket')
                .setEmoji('📩')
                .setLabel('Create ticket')
                .setStyle(ButtonStyle.Secondary),
            )
          TicketChannel.send({ embeds: [ticket], components: [row] })
            .then(async msg =>
              await db.set(`TicketMsg_${interaction.guild.id}`, msg.id),
              await db.set(`TicketChannel_${interaction.guild.id}`, TicketChannel.id)
            )
          interaction.reply({ embeds: [ticketSuccess] });
          ticketSuccess
            .addFields({ name: `Requested by`, value: `${interaction.user}` })
          logchannel.send({ embeds: [ticketSuccess] });
          break;


        case 'verifychannel':
          const vchannel = interaction.options.getChannel('channel');
          const preChannel = await db.get(`verifyChannel_${interaction.guild.id}`);
          if (preChannel) {
            interaction.guild.channels.cache.get(preChannel).messages
              .fetch({ message: await db.get(`verifyMsg_${interaction.guild.id}`) })
              .then(m => m.delete());
          }

          const embed = new EmbedBuilder()
            .setTitle('🤖 Verification Required')
            .setColor('Blue')
            .setImage('https://images-ext-2.discordapp.net/external/kWYyE31PdjfTtYMmU7zN__qBz0Z87oLUSQYIlzXtKY4/%3Fwidth%3D624%26height%3D468/https/images-ext-1.discordapp.net/external/UEu3Cx_CnK2HB4MXx6l1hypTiwG1YWAVO1dIDyDe4h8/https/i.pinimg.com/originals/70/a5/52/70a552e8e955049c8587b2d7606cd6a6.gif')
            .setDescription(`Hey, welcome to **${interaction.guild.name}**. First you need to prove you are a human by completing a captcha.\n\n **Click the button below to get started**`)
          const button = new ButtonBuilder()
            .setLabel('Verify')
            .setCustomId('verify')
            .setEmoji('🤖')
            .setStyle(ButtonStyle.Success);

          vchannel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(button)] })
            .then(async msg =>
              await db.set(`verifyMsg_${interaction.guild.id}`, msg.id),
              await db.set(`verifyChannel_${interaction.guild.id}`, vchannel.id)
            );
          interaction.reply(`Verification message has been send to ${vchannel}`);
          break;


        case 'ticketlogs':
          const TicketLogs = interaction.options.getChannel('channel');
          db.set(`TicketLogsChannel_${interaction.guild.id}`, TicketLogs.id);
          const ticketLogSuccess = new EmbedBuilder()
            .setTitle(`Ticket Logging Channel has been set`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setTimestamp()
            .setColor('Yellow')
            .setDescription(`New Channel is ${TicketLogs}`);
          interaction.reply({ embeds: [ticketLogSuccess] });
          ticketLogSuccess
            .addFields({ name: `Requested by`, value: `${interaction.user}` })
          logchannel.send({ embeds: [ticketLogSuccess] });
          break;


        case 'notifyrole':
          const notifyRole = interaction.options.getRole('role');
          db.set(`notifyRole_${interaction.guild.id}`, notifyRole.id);
          const notifySuccess = new EmbedBuilder()
            .setTitle(`Alt Notify Role has been set`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setColor('Yellow')
            .setDescription(`New Role is ${notifyRole}`);
          interaction.reply({ embeds: [notifySuccess] });
          notifySuccess
            .addFields({ name: `Requested by`, value: `${interaction.user}` })
          logchannel.send({ embeds: [notifySuccess] });
          break;


        case 'memberrole':
          const memberRole = interaction.options.getRole('role');
          db.set(`memberRole_${interaction.guild.id}`, memberRole.id);
          const membroleSuccess = new EmbedBuilder()
            .setTitle(`Alt Member Role has been setted`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setColor('Yellow')
            .setDescription(`New Role is ${notifyRole}`);
          interaction.reply({ embeds: [membroleSuccess] });
          membroleSuccess
            .addFields({ name: `Requested by`, value: `${interaction.user}` })
          logchannel.send({ embeds: [membroleSuccess] });
          break;


        case 'verifiedrole':
          const verifiedRole = interaction.options.getRole('role');
          db.set(`verifiedRole_${interaction.guild.id}`, verifiedRole.id);
          const verifySuccess = new EmbedBuilder()
            .setTitle(`Alt Verified Role has been setted`)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setColor('Yellow')
            .setDescription(`New Role is ${verifiedRole}`);
          interaction.reply({ embeds: [verifySuccess] });
          verifySuccess
            .addFields({ name: `Requested by`, value: `${interaction.user}` })
          logchannel.send({ embeds: [verifySuccess] });
          break;


        case 'whitelist':
          const Whitelist = interaction.options.getInteger('userid');
          db.set(`WhiteListed_${interaction.guild.id}`, Whitelist);
          const whitelisted = new EmbedBuilder()
            .setTitle(`NEW WHITELIST USER SETTED`)
            .setColor('Yellow')
            .setDescription(`
    __Some Details About User__
**__ID__** - ${Whitelist}
***__NOTE__*** - **YOU CAN ONLY SET ONE WHITELIST USER ID THE PREVIOUS ID WILL BE DELETED AUTOMATICALLY**`);
          interaction.reply({ embeds: [whitelisted] });
          whitelisted
            .addFields({ name: `Requested by`, value: `${interaction.user}` })
          logchannel.send({ embeds: [whitelisted] });
          break;


        case 'remove':
          const remove = new EmbedBuilder()
            .setAuthor({ name: `Config Removed` })
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setColor('Yellow');

          switch (interaction.options.getString('config')) {
            case 'log channel':
              db.delete(`LoggingChannel_${interaction.guild.id}`);
              remove
                .setTitle(`**Logging Channel Has Been Removed**`);
              interaction.reply({ embeds: [remove] });
              remove
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [remove] });
              break;


            case 'error log channel':
              db.delete(`ErrorLogChannel_${interaction.guild.id}`);
              remove
                .setTitle(`**Error Logging Channel Has Been Removed**`);
              interaction.reply({ embeds: [remove] });
              remove
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [remove] });
              break;


            case 'ticket channel':
              db.delete(`TicketChannel_${interaction.guild.id}`);
              remove
                .setTitle(`**Logging Channel Has Been Removed**`);
              interaction.reply({ embeds: [remove] });
              remove
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [remove] });
              break;


            case 'ticket logs':
              db.delete(`TicketLogsChannel_${interaction.guild.id}`);
              remove
                .setTitle(`**Ticket Log Channel Has Been Removed**`);
              interaction.reply({ embeds: [remove] });
              remove
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [remove] });
              break;


            case 'notify role':
              db.delete(`notifyRole_${interaction.guild.id}`);
              remove
                .setTitle(`**Notify Role Has Been Removed**`);
              interaction.reply({ embeds: [remove] });
              remove
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [remove] });
              break;


            case 'member role':
              db.delete(`memberRole_${interaction.guild.id}`);
              remove
                .setTitle(`**Member Role Has Been Removed**`);
              interaction.reply({ embeds: [remove] });
              remove
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [remove] });
              break;


            case 'verified role':
              db.delete(`verifiedRole_${interaction.guild.id}`);
              remove
                .setTitle(`**Verified Role Has Been Removed**`);
              interaction.reply({ embeds: [remove] });
              remove
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [remove] });
              break;


            case 'whitelist':
              db.delete(`WhiteListed_${interaction.guild.id}`);
              remove
                .setTitle(`**WhiteList User Has Been Removed**`);
              interaction.reply({ embeds: [remove] });
              remove
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [remove] });
              break;
          }
      }


    } else if (interaction.options.getSubcommandGroup()) {

      switch (interaction.options.getSubcommandGroup()) {
        case 'autokick':
          const autokick = new EmbedBuilder()
            .setAuthor({ name: `Auto Kick System` })
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: "Bot Made By ! Chirath#5959" })
            .setColor('Yellow');

          switch (interaction.options.getSubcommand()) {

            case 'set':
              const autokickage = interaction.options.getInteger('days');
              db.set(`AutokickAge_${interaction.guild.id}`, autokickage);
              autokick
                .setTitle(`AutoKick Age has been Setted!`)
                .setDescription(`New AltAge is \`${autokickage}\` Days`);
              interaction.reply({ embeds: [autokick] });
              autokick
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [autokick] });
              break;


            case 'enable':
              db.set(`AutoKick_${interaction.guild.id}`, true);
              db.set(`AutoKickAge_${interaction.guild.id}`, 8);
              autokick
                .setTitle(`**AutoKick Has Been __Enabled__** \nAutokick Age is \`8\` Days By Default`);
              interaction.reply({ embeds: [autokick] });
              autokick
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [autokick] });
              break;


            case 'disable':
              db.delete(`AutoKick_${interaction.guild.id}`);
              autokick
                .setTitle(`**AutoKick Has Been __Disabled__**`);
              interaction.reply({ embeds: [autokick] });
              autokick
                .addFields({ name: `Requested by`, value: `${interaction.user}` })
              logchannel.send({ embeds: [autokick] });
              break;

          }
      }
    }
  }
};