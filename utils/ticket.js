const { ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('quick.db');

let endTime;
let renameCooldown = new Set();

module.exports = {

    createTicket: async function (interaction, client) {
        let ticketId = await db.get(`TicketNumber_${interaction.guild.id}`);
        let ticket_num = ("000" + ticketId).slice(-4);
        await db.set(`TicketNumber_${interaction.guild.id}`, ++ticketId);

        const tChannel = await interaction.guild.channels.create(
            {
                name: `ticket - ${ticket_num}`,
                parent: interaction.channel.parent,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        allow: [],
                        deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                        deny: [],
                    },
                    {
                        id: interaction.guild.roles.cache.find((r) => r.name === 'Moderator'),
                        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                        deny: [],
                    },
                ],
            }
        );
        await db.set(`tickets_${tChannel.id}`, {
            id: ticket_num,
            creator: interaction.user.id,
            invited: [],
            createdAt: new Date(),
            claimed: false,
            claimedBy: null,
            claimedAt: null,
            closed: false,
            closedBy: null,
            closedAt: null
        });

        interaction.reply({ content: `Ticket created ${tChannel}`, ephemeral: true });
        const ticketLogChannel = interaction.guild.channels.cache.get(await db.get(`TicketLogsChannel_${interaction.guild.id}`));
        const ticketLog = new EmbedBuilder()
            .setTitle('Ticket Logs')
            .setColor('Blue')
            .setTimestamp()
            .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${interaction.user} has created a new ticket ${tChannel}`);
        ticketLogChannel.send({ content: `__Notification:__ @here`, embeds: [ticketLog] })

        const created = new EmbedBuilder()
            .setColor("#FFF000")
            .setDescription(
                "Support will be with you shortly.\n To close this ticket react with 🔒"
            )
            .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() });
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('closeConfirmation')
                    .setEmoji('🔒')
                    .setLabel('Close')
                    .setStyle(ButtonStyle.Secondary),
            )
        tChannel.send({ content: `${interaction.user} Welcome`, embeds: [created], components: [row] });
    },


    closeConfirmation: async function (interaction) {
        const Ticket = await db.get(`tickets_${interaction.channel.id}`);

        if (Ticket.closed == true) {
            interaction.reply({ content: '>>> **Warning**: ticket already closed', ephemeral: true });
        }
        else if (Ticket.closed == false) {
            await interaction.deferUpdate();
            let x = 30;
            interaction.channel.send({ content: `Enter the reason to close the ticket - ${x}s` }).then(async msg => {
                let int = setInterval(() => {
                    msg.edit({ content: `Enter the reason to close the ticket - ${--x}s` });
                    if (x == 0) {
                        clearInterval(int);
                        msg.delete();
                    }
                }, 1000);
                const filter = m => m.author.id === interaction.user.id;
                const response = await interaction.channel.awaitMessages({
                    filter,
                    max: 1,
                    time: 30000
                });

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('closeTicket')
                            .setLabel('Close')
                            .setStyle(ButtonStyle.Danger),

                        new ButtonBuilder()
                            .setCustomId('closeCancel')
                            .setLabel('Cancel')
                            .setStyle(ButtonStyle.Secondary)
                    )
                clearInterval(int);
                msg.delete();
                interaction.channel.send({ content: `Are you sure you would like to close this ticket?\n \`\`\`Reason: ${response.first().content}\`\`\``, components: [row] }).then(async msg => {
                    await db.set(`tickets_${interaction.channel.id}.closeConfirm`, msg.id);
                    await db.set(`tickets_${interaction.channel.id}.closeReason`, response.first().content);
                }
                )
            });
        };
    },


    closeCancel: async function (interaction) {
        const Ticket = await db.get(`tickets_${interaction.channel.id}`);

        interaction.channel.messages.fetch({ message: Ticket.closeConfirm }).then(async msg => {
            msg.delete();
            await db.delete(`tickets_${interaction.channel.id}.closeConfirm`);
        })

        interaction.reply({ content: 'Cancelled', ephemeral: true });
    },


    closeTicket: async function (interaction, client) {
        const Ticket = await db.get(`tickets_${interaction.channel.id}`);

        await interaction.deferUpdate();
        interaction.channel.messages.fetch({ message: Ticket.closeConfirm }).then(async msg => {
            msg.delete();
            await db.delete(`tickets_${interaction.channel.id}.closeConfirm`);
        });

        if (renameCooldown.has(interaction.channel.id + "_2")) {
            let { timeDifference } = require('./utils.js');
            interaction.channel.send(`Channel being renamed too quickly, Timeout: ${timeDifference(Date.now(), endTime).minutes}m, ${timeDifference(Date.now(), endTime).seconds}s - Skipping`);
        }
        else {
            await interaction.channel.setName(`closed-${Ticket.id}`);
            if (!renameCooldown.has(interaction.channel.id)) {
                renameCooldown.add(interaction.channel.id);
                setTimeout(() => {
                    if (!interaction.channel) return;
                    renameCooldown.delete(interaction.channel.id);
                }, 600000);
            }
            else if (renameCooldown.has(interaction.channel.id)) {
                renameCooldown.add(interaction.channel.id + "_2");
                setTimeout(() => {
                    if (!interaction.channel) return;
                    renameCooldown.delete(interaction.channel.id + "_2");
                }, 600000);
            }

            if (!endTime) {
                endTime = Date.now() + 600000;
            }
            else {
                endTime += 600000;
            }
        };
        interaction.channel.permissionOverwrites.set([
            {
                id: interaction.guild.id,
                allow: [],
                deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: interaction.guild.roles.cache.find((r) => r.name === 'Moderator'),
                allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                deny: [],
            },
        ]);

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('openTicket')
                    .setEmoji('🔓')
                    .setLabel('Open')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('deleteTicket')
                    .setEmoji('⛔')
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Secondary),
            )
        await interaction.channel.send({
            embeds: [new EmbedBuilder()
                .setColor('Yellow')
                .setDescription(`Ticket closed by ${interaction.user}\n ( Reason: ${Ticket.closeReason} )`)]
        });

        interaction.channel.send({ content: '```Support team ticket controls```', components: [row1] }).then(async closeMsg =>
            db.set(`tickets_${interaction.channel.id}.closeMsg`, closeMsg.id));
        await db.set(`tickets_${interaction.channel.id}.closed`, true);
        await db.set(`tickets_${interaction.channel.id}.closedBy`, interaction.user.id);
        await db.set(`tickets_${interaction.channel.id}.closedAt`, new Date());
        const ticketLogChannel = interaction.guild.channels.cache.get(await db.get(`TicketLogsChannel_${interaction.guild.id}`));
        const ticketLog = new EmbedBuilder()
            .setTitle('Ticket Logs')
            .setColor('Blue')
            .setTimestamp()
            .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${interaction.user} has been locked the ${interaction.channel} (${interaction.channel.name})`);
        ticketLogChannel.send({ embeds: [ticketLog] });
    },


    openTicket: async function (interaction) {
        const Ticket = await db.get(`tickets_${interaction.channel.id}`);

        await interaction.deferUpdate();
        if (renameCooldown.has(interaction.channel.id + "_2")) {
            let { timeDifference } = require('../utils.js');
            interaction.channel.send(`Channel being renamed too quickly, Timeout: ${timeDifference(Date.now(), endTime).minutes}m, ${timeDifference(Date.now(), endTime).seconds}s - Skipping`);
        }
        else {
            await interaction.channel.setName(`ticket-${Ticket.id}`);
            if (!renameCooldown.has(interaction.channel.id)) {
                renameCooldown.add(interaction.channel.id);
                setTimeout(() => {
                    if (!interaction.channel) return;
                    renameCooldown.delete(interaction.channel.id);
                }, 600000);
            }
            else if (renameCooldown.has(interaction.channel.id)) {
                renameCooldown.add(interaction.channel.id + "_2");
                setTimeout(() => {
                    if (!interaction.channel) return;
                    renameCooldown.delete(interaction.channel.id + "_2");
                }, 600000);
            };

            if (!endTime) {
                endTime = Date.now() + 600000;
            }
            else {
                endTime += 600000;
            };
        };
        interaction.channel.permissionOverwrites.edit(Ticket.creator, { ViewChannel: true, SendMessages: true });
        await db.set(`tickets_${interaction.channel.id}.closed`, false);
        await db.set(`tickets_${interaction.channel.id}.closedBy`, null);
        await db.set(`tickets_${interaction.channel.id}.closedAt`, null);

        await interaction.channel.messages.fetch({ message: Ticket.closeMsg }).then(async msg => {
            msg.delete();
            await db.delete(`tickets_${interaction.channel.id}.closeMsg`);
        }

        );

        await interaction.channel.send({
            embeds: [new EmbedBuilder()
                .setColor('Green')
                .setDescription(`Ticket opened by ${interaction.user}`)]
        });
    },


    deleteTicket: async function (interaction, client) {
        const Ticket = await db.get(`tickets_${interaction.channel.id}`);
        let i = 10;

        await interaction.deferUpdate();
        let fields = [];
        fields.push(
            { name: 'Ticket ID', value: `${Ticket.id}` },
            { name: 'Created By', value: Ticket.creator },
            { name: 'Created At', value: Ticket.createdAt }
        );
        if (Ticket.invited.length > 0) {
            fields.push({ name: 'Invited', value: Ticket.invited.toString() });
        };
        if (Ticket.claimed == true) {
            fields.push(
                { name: 'Claimed By', value: Ticket.claimedBy },
                { name: 'Claimed At', value: Ticket.claimedAt }
            );
        };
        fields.push(
            { name: 'Closed By', value: Ticket.closedBy },
            { name: 'Closed Reason', value: Ticket.closeReason },
            { name: 'Closed At', value: Ticket.closedAt },
        );
        const ticketLogChannel = interaction.guild.channels.cache.get(await db.get(`TicketLogsChannel_${interaction.guild.id}`));
        const ticketLog = new EmbedBuilder()
            .setTitle('Ticket Logs')
            .setColor('Blue')
            .setTimestamp()
            .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${interaction.user} has been deleted the **${interaction.channel.name}**`)
            .addFields(fields);

        let deleteMsg = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`This channel will delete in ${i--} seconds`)
        interaction.channel.send({ embeds: [deleteMsg] }).then((msg) => {
            let interval = setInterval(() => {
                deleteMsg.setDescription(`This channel will delete in ${i--} seconds`);
                msg.edit({ embeds: [deleteMsg] });
                if (i == 0) {
                    clearInterval(interval);
                    ticketLogChannel.send({ embeds: [ticketLog] })
                    setTimeout(() => {
                        return interaction.channel.delete();
                    }, 2000);
                }
            }, 1000)
        });
        setTimeout(() => {
            db.delete(`tickets_${interaction.channel.id}`);
        }, 5000);
    },
};