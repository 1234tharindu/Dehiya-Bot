const { EmbedBuilder, Events, ActivityType } = require("discord.js");
let i = 0;

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.guilds.fetch(client.config.guildId).then(async (guild) => {
      client.user.setStatus("idle");
      console.log(
        `\x1B[94mReady ${client.user.tag} is logged in and online ☑️\x1B[39m`
      );
      const logchannel = await client.db.get(`ErrorLoggingChannel_${guild.id}`);
      client.channels.cache.get(logchannel).send({
        embeds: [
          new EmbedBuilder()
            .setColor("0x00ff00")
            .setTitle(`${client.user.username} Bot is online ||@Admin||`)
            .setTimestamp()
            .setFooter({
              text: `${client.user.username}`,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
      });

      // ACTIVITY STATUS
      setInterval(() => {
        const activities_list = [
          {
            name: `${guild.name}`,
            type: ActivityType.Watching,
            status: "idle",
          },
          {
            name: `${guild.memberCount} Members`,
            type: ActivityType.Watching,
            status: "dnd",
          },
          {
            name: `with ${client.user.username} Bot`,
            type: ActivityType.Playing,
            status: "online",
          },
        ];

        if (i == 3) {
          i = 0;
        }
        client.user.setPresence({ activities: [activities_list[i++]] });
      }, 3000);

      // Server Stats
      setInterval(() => {
        client.channels.cache
          .get(client.config.serverStatsChannel)
          .setName(`Total Members : ${guild.memberCount}`);
      }, 60000);
    });
  },
};
