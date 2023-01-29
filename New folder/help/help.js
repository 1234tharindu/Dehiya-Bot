const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message) => {

    let helpEmbed = new EmbedBuilder()
      .setTitle(`**Here are __${client.user.username} Bot__ commands**`)
      .setDescription("**Command Parameters: <> is strict & [] is optional**")
      .addFields([
        {
          name: "• **MODERATION**",
          value: "```prefix, emojiadd, add-these, announce, bug, addrole, ban, purge, hackban, kick, lock, mute, removerole, resetwarns, setnick, setmodlog, slowmode, unlock, unmute, voicekick, warn, warnings, setwelcome , nuke```"
        },
        {
          name: "• **GENERAL**",
          value: "```servericon , calculator , invite , membercount ,  help , serverinfo , leaderboard``` "
        },
        {
          name: "• **GIVEAWAY**",
          value: "```gstart , gend , greroll```"
        },
        {
          name: "• **SUGGESTION**",
          value: "```sreply, setsuggest, suggest```"
        },
        {
          name: "• **UTILITY**",
          value: "```discriminator, findemoji, haste, webhook , timedifference , send , sendembed , dm , dmembed```"
        },
        {
          name: "• **LEVEL**",
          value: "```lb, rank```"
        },
        {
          name: "• **SEARCH**",
          value: "```anime, discord, github, ig, npm, twitter```"
        },
        {
          name: "• **ECONOMY**",
          value: "```balance, daily, fish, addmoney, beg, buy, deposit, leaderboard, pay, removemoney, roulette, sell, slots, shop, coins-system, withdraw, work```"
        },
        {
          name: "• **Backup**",
          value: "```backup-create,backup-load, backup-info, backup-remove, backups```"
        },
        {
          name: "• **INFO**",
          value: "```inv, help, invite, invites, badges, botinfo, imdb, ping, pokemon, serverinfo, servericon, snipe, uptime, userinfo, dashboard, developer``` "
        },
        {
          name: "• **MUSIC**",
          value: "```loop, clear, disable-loop, join, leave, nowplaying, play, playlist, pause, queue, resume, shuffle, skip, stop, volume```"
        },
        {
          name: "• **IMAGE**",
          value: "```neko, slap, jail, love, triggered, achievement, avatarfusion, panda, rip, affect``` "
        },
        {
          name: "• **OWNER**",
          value: "```eval , getinvite , serverlist , stats , ticketcountreset```"
        },
        {
          name: "• **FUN**",
          value: "```advice, ascii, cat, cry, dog, fact, hug, joke, kiss, math, meme, pat, punch, avatar``` "
        },
        {
          name: 'Important Links ',
          value: '**[Invite Me](https://discord.com/oauth2/authorize?client_id=906899294815145995&permissions=8&scope=bot%20applications.commands)** **• [Discord](https://discord.gg/n5tpK32xdf)**'
        },
      ])
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({
        text: `${client.user.username} Bot`,
        iconURL: client.user.displayAvatarURL()
      });

    message.channel.send({ embeds: [helpEmbed] })

  },
};