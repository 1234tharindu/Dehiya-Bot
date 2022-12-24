const { Events } = require("discord.js");
const { guildId, reactionMsgId, reactionChannelId } = require("../config.json")

module.exports = {
    name: Events.ClientReady,
    once: false,
    async execute(client) {
        client.guilds.fetch(guildId).then((guild) => {

            // Reaction Roles
            const rechannel = client.channels.cache.get(`${reactionChannelId}`);
            if (rechannel) {
                try {
                    rechannel.messages.fetch(`${reactionMsgId}`).then((message) => {
                        message.react('1️⃣');
                        message.react('2️⃣');
                        message.react('3️⃣');
                        message.react('4️⃣');
                        message.react('5️⃣');
                        message.react('6️⃣');
                        message.react('7️⃣');
                        message.react('8️⃣');
                        message.react('9️⃣');
                        const collector = message.createReactionCollector(
                            (reaction, user) =>
                                message.guild.members.cache.find((member) => member.id === user.id),
                            {
                                dispose: true,
                            }
                        );

                        collector.on("collect", (reaction, user) => {
                            if (user.bot) return;
                            switch (reaction.emoji.name) {
                                case '1️⃣':
                                    let WebDevelopment = guild.roles.cache.find((role) => role.name == 'Web Development');
                                    message.guild.members.cache.get(user.id).roles.add(WebDevelopment);
                                    break;

                                case '2️⃣':
                                    let SoftwareDevelopment = guild.roles.cache.find((role) => role.name == 'Software Development');
                                    message.guild.members.cache.get(user.id).roles.add(SoftwareDevelopment);
                                    break;
                                case '3️⃣':
                                    let MobileApplicationDevelopment = guild.roles.cache.find((role) => role.name == 'Mobile Application Development');
                                    message.guild.members.cache.get(user.id).roles.add(MobileApplicationDevelopment);
                                    break;

                                case '4️⃣':
                                    let QualityAssuarance = guild.roles.cache.find((role) => role.name == 'Quality Assuarance');
                                    message.guild.members.cache.get(user.id).roles.add(QualityAssuarance);
                                    break;
                                case '5️⃣':
                                    let DatabaseManagement = guild.roles.cache.find((role) => role.name == 'Database Management');
                                    message.guild.members.cache.get(user.id).roles.add(DatabaseManagement);
                                    break;

                                case '6️⃣':
                                    let UiUxDesign = guild.roles.cache.find((role) => role.name == 'Ui/Ux Design');
                                    message.guild.members.cache.get(user.id).roles.add(UiUxDesign);
                                    break;
                                case '7️⃣':
                                    let BlockchainTechnology = guild.roles.cache.find((role) => role.name == 'Blockchain Technology');
                                    message.guild.members.cache.get(user.id).roles.add(BlockchainTechnology);
                                    break;

                                case '8️⃣':
                                    let Networking = guild.roles.cache.find((role) => role.name == 'Networking');
                                    message.guild.members.cache.get(user.id).roles.add(Networking);
                                    break;
                                case '9️⃣':
                                    let Other = guild.roles.cache.find((role) => role.name == 'Other');
                                    message.guild.members.cache.get(user.id).roles.add(Other);
                                    break;
                            }
                        })
                    })

                } catch (error) {
                    console.log(error);
                }
            };
        })
    }
};