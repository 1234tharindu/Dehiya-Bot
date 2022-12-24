const { MessageEmbed } = require('discord.js');

const moment = require('moment');

const filterLevels = {

	DISABLED: 'Off',

	MEMBERS_WITHOUT_ROLES: 'No Role',

	ALL_MEMBERS: 'Everyone'

};

const verificationLevels = {

	NONE: 'None',

	LOW: 'Low',

	MEDIUM: 'Medium',

	HIGH: '(╯°□°）╯︵ ┻━┻',

	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'

};

const regions = {

	brazil: 'Brazil',

	europe: 'Europe',

	hongkong: 'Hong Kong',

	india: 'India',

	japan: 'Japan',

	russia: 'Russia',

	singapore: 'Singapore',

	southafrica: 'South Africa',

	sydeny: 'Sydeny',

	'us-central': 'US Central',

	'us-east': 'US East',

	'us-west': 'US West',

	'us-south': 'US South'

};

module.exports = {

  name: "serverinfo",

  category: "info",

  aliases: ["serverinfo"],

  description: "Get info about your server.",

  usage: "serverinfo ",

run: (client, message, args) => {

		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

		const members = message.guild.members.cache;

		const channels = message.guild.channels.cache;

		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()

			.setDescription(`**Guild information for __${message.guild.name}__**`)

			.setColor('BLUE')

			.setThumbnail(message.guild.iconURL({ dynamic: true }))

      .addField('**• Owner:**', `${message.guild.owner.user.tag}`, true)
      .addField('** • Created At**', `${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`, true)
      .addField('** • Roles**', ` ${roles.length}`, true)
      .addField('** • Emojis**', ` ${emojis.size}`, true)
      .addField('** • Boost Count**', ` ${message.guild.premiumSubscriptionCount || '0'}`, true)
      .addField('** • Verification Level**', ` ${verificationLevels[message.guild.verificationLevel]}`, true)
      .addField('** • Content Filter**', ` ${filterLevels[message.guild.explicitContentFilter]}`, true)
      .addField('** • Member**', ` ${message.guild.memberCount}`, true)
      .addField('** • Shard**', `0`, true)
      .addField('** • Channels**', `⌨️ ${channels.filter(channel => channel.type === 'text').size}  | 🔈 ${channels.filter(channel => channel.type === 'voice').size}`, true)
      .addField('** • Bots**', `${members.filter(member => member.user.bot).size}`, true)


      

      .setFooter(
           `CT Bot`,
            client.user.displayAvatarURL()  
      )
			.setTimestamp();


		message.channel.send(embed);

	}

};
