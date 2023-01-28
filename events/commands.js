const { Events } = require("discord.js");
const db = require("quick.db");
const { guildId } = require('../config.json');
const { default_prefix } = require("../config.json");
module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message, client) {
        let prefix = db.get(`prefix_${guildId}`);

        if (!prefix) {
            prefix = default_prefix;
        }
        if (!(message.channel.name.startsWith("bot")) && !(message.channel.name.startsWith("admin"))) return;
        if (message.content == `${message.guild.members.me}`) {
            return message.reply(`My prefix is \`${prefix}\``);
        }

        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;

        if (!message.member) message.member = message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        let command = client.commands.get(cmd);

        if (command) command.run(client, message, args);
    }
}