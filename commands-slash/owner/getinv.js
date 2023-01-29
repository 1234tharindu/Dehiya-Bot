const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const ownerid = "771639970854731808";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getinvite')
        .setDescription('get invite')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    run: async (bot, message, args) => {
        if (message.author.id === ownerid) {
            let guild = null;

            if (!args[0]) return message.channel.send("Enter Guild Name or Guild ID of where you want Invite Link.")

            if (args[0]) {
                let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
                let found = bot.guilds.cache.get(args[0]);
                if (!found) {
                    if (fetched) {
                        guild = fetched;
                    }
                } else {
                    guild = found
                }
            } else {
                return message.channel.send("That's the Invalid Guild Name");
            }
            if (guild) {
                let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
                if (!tChannel) {
                    return message.channel.send("Sorry, I doesn't have CREATE_INSTANT_INVITE Permission There!");
                }
                let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                    return message.channel.send(`${err} has occured!`);
                });
                message.channel.send(invite.url);
            } else {
                return message.channel.send(`\`${args.join(' ')}\` - I'm not in that Server.`);
            }
        } else {
            return;
        }
    }

}