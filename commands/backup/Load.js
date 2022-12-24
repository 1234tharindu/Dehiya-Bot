const Discord = require("discord.js");
const backup = require('discord-backup');
module.exports = {
    name: "backup-load",
    aliases: ["bload"],
    category: "backup",
    usage: "qbackup-load",
    description: "load a server backup",
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
        }

        const backupID = args.join(' ');

        backup.fetch(backupID).then(() => {

            let embed = new Discord.MessageEmbed()
                .setTitle("Read below")
                .setDescription(
                    ':warning: All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!'
                )
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(
                    `${client.user.username} Bot`,
                    client.user.displayAvatarURL()
                )

            message.channel.send(embed);

            const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
                time: 60000,
                max: 1
            });
            collector.on('collect', (m) => {
                const confirm = m.content === '-confirm';
                collector.stop();
                if (confirm) {

                    backup.load(backupID, message.guild).then(() => {

                        const embed1 = new Discord.MessageEmbed()
                            .setTitle("Read below")
                            .setDescription(
                                "<a:tickYes:904236251190788116> Backup loaded successfully! "
                            )

                        return message.author.send(embed1);

                    }).catch((err) => {

                        if (err === 'No backup found')
                            return message.channel.send(':x: No backup found for ID ' + backupID + '!');
                        else
                            return message.author.send(':x: An error occurred: ' + (typeof err === 'string') ? err : JSON.stringify(err));

                    });

                } else {
                    return message.channel.send(':x: Cancelled.');
                }
            })

            collector.on('end', (collected, reason) => {
                if (reason === 'time')
                    return message.channel.send(':x: Command timed out! Please retry.');
            })

        }).catch(() => {
            return message.channel.send(':x: No backup found for ID ' + backupID + '!');
        });

    }
}