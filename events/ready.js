const db = require("quick.db");
const { EmbedBuilder, Events, ActivityType } = require("discord.js");
const { guildId, serverStatsChannel } = require("../config.json");
let i = 0;
module.exports = {
  name: Events.ClientReady,
  once: false,
  async execute(client) {
    client.guilds.fetch(guildId).then((guild) => {
      client.user.setStatus("idle");
      console.log("Bot is working!!");
      const logchannel = db.get(`ErrorLoggingChannel_${guildId}`);
      client.channels.cache.get(logchannel).send({
        embeds: [
          new EmbedBuilder()
            .setColor("0x00ff00")
            .setTitle(`${client.user.username} Bot is online ||@Admin||`)
            .setTimestamp()
            .setFooter({
              text: `${client.user.username}`,
              iconURL: client.user.displayAvatarURL()
            })
        ]
      });
      // ACTIVITY STATUS
      setInterval(() => {
        const activities_list = [
          { name: `${guild.name}`, type: ActivityType.Watching },
          { name: `${guild.memberCount} Members`, type: ActivityType.Watching },
          { name: `with ${client.user.username} Bot`, type: ActivityType.Playing }
        ];

        if (i == 3) {
          i = 0
        }
        client.user.setPresence({ activities: [activities_list[i++]] });

      }, 3000);

      // Server Stats
      setInterval(() => {
        client.channels.cache.get(serverStatsChannel).setName(`Total Members : ${guild.memberCount}`);
      }, 60000);

    })
  }
};