const { EmbedBuilder } = require("discord.js");
const malScraper = require('mal-scraper');

module.exports = {
  name: "anime",
  category: "search",
  description: "Get info about an anime",
  usage: "[command | Anime]",
  run: async (message, args) => {
    //command
    const search = `${args}`;
    if (!search)
      return message.reply('Please add a search query!');

    malScraper.getInfoFromName(search)
      .then((data) => {
        const malEmbed = new EmbedBuilder()
          .setAuthor({ name: `My Anime List search result for ${args}`.split(',').join(' ') })
          .setThumbnail(data.picture)
          .setColor('Random')
          .addFields([
            { name: 'Premiered', value: `\`${data.premiered}\``, inline: true },
            { name: 'Broadcast', value: `\`${data.broadcast}\``, inline: true },
            { name: 'Genres', value: `\`${data.genres}\``, inline: true },
            { name: 'English Title', value: `\`${data.englishTitle}\``, inline: true },
            { name: 'Japanese Title', value: `\`${data.japaneseTitle}\``, inline: true },
            { name: 'Type', value: `\`${data.type}\``, inline: true },
            { name: 'Episodes', value: `\`${data.episodes}\``, inline: true },
            { name: 'Rating', value: `\`${data.rating}\``, inline: true },
            { name: 'Aired', value: `\`${data.aired}\``, inline: true },
            { name: 'Score', value: `\`${data.score}\``, inline: true },
            { name: 'Favorite', value: `\`${data.favorites}\``, inline: true },
            { name: 'Ranked', value: `\`${data.ranked}\``, inline: true },
            { name: 'Duration', value: `\`${data.duration}\``, inline: true },
            { name: 'Studios', value: `\`${data.studios}\``, inline: true },
            { name: 'Popularity', value: `\`${data.popularity}\``, inline: true },
            { name: 'Members', value: `\`${data.members}\``, inline: true },
            { name: 'Score Stats', value: `\`${data.scoreStats}\``, inline: true },
            { name: 'Source', value: `\`${data.source}\``, inline: true },
            { name: 'Synonyms', value: `\`${data.synonyms}\``, inline: true },
            { name: 'Status', value: `\`${data.status}\``, inline: true },
            { name: 'Identifier', value: `\`${data.id}\``, inline: true },
            { name: 'Link', value: data.url, inline: true },
          ])
          .setTimestamp()
          .setFooter({
            text: `Requested ${message.member.displayName}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
          })

        message.channel.send({ embeds: [malEmbed] });

      })
  }
};