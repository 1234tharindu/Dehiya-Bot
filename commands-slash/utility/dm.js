const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Send a dm to a guild user')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    run: async (client, message, args) => {


        let dUser =
            message.guild.member(message.mentions.users.first()) ||
            message.guild.members.get(args[0]);

        if (!dUser) return message.channel.send("Can't find user!");

        if (!message.member.hasPermission('ADMINISTRATOR'))
            return message.reply("You can't you that command!");

        let dMessage = args.slice(1).join(' ');
        if (dMessage.length < 1) return message.reply('You must supply a message!');

        dUser.send(`${dMessage}`);

        message.channel.send(
            `${message.author} You have sent your message to ${dUser}`
        );
    }

} 
