const { PermissionsBitField } = require('discord.js');
const ms = require('ms');
module.exports = {
    name: "gend",
    description: "Ending giveaway",
    accessableby: "Administrator",
    category: "giveaway",
    aliases: ["giveaway-end"],
    usage: '<giveawaymessageid>',
    run: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !message.member.roles.cache.find((r) => r.name === "Giveaways")) {
            return message.channel.send(':x: You need to have the manage messages permissions to reroll giveaways.');
        }

        // If no message ID or giveaway name is specified
        if (!args[0]) {
            return message.channel.send(':x: You have to specify a valid message ID!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === args[0]);

        // If no giveaway was found
        if (!giveaway) {
            return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
        }

        // Edit the giveaway
        client.giveawaysManager.edit(giveaway.messageId, {
            setEndTimestamp: Date.now()
        })
            // Success message
            .then(() => {
                // Success message
                message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message Id ${giveaway.messageId} is already ended.`)) {
                    message.channel.send('This giveaway is already ended!');
                } else {
                    console.error(e);
                    message.channel.send('An error occured...');
                }
            });
    }
}