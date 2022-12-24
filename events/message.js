const { Events } = require("discord.js");
const db = require("quick.db");
const { internshipsChannel } = require("../config.json");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {

        // Internship Submit
        if (message.channel.name === "add-internship-details") {
            message.react('✅');
            message.guild.channels.cache.get(internshipsChannel).send(`${message}\nPosted By - ${message.member}`).then((m) => m.react('✅'));
        };

        // Auto Reply
        if (message.channel.name === "general-chat")
            if (message.content.toLowerCase() === "hi") {
                message.reply({
                    files: ['https://tenor.com/view/bad-teeth-breath-hot-gif-23600638.gif'], ephemeral: true
                });
            };
        // ABot Chat
        if (message.channel.name == "abotchat") {
            if (message.author.bot) return;
            message.content = message.content
                .replace(/@(everyone)/gi, "everyone")
                .replace(/@(here)/gi, "here");
            if (message.content.includes(`@`)) {
                return message.channel.send(`**:x: Please dont mention anyone**`);
            }
            message.channel.startTyping();
            if (!message.content) return message.channel.send("Please say something.");
            scb
                .chat({
                    message: message.content,
                    name: client.user.username,
                    owner: "cwkhan",
                    user: message.author.id,
                    language: "auto",
                })
                .then((reply) => {
                    message.inlineReply(`${reply}`);
                });
            message.channel.stopTyping();
        }
    }
}