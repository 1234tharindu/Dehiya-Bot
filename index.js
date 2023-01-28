const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("bot online yay boy!!"));

app.listen(port, () =>
  console.log(`Your app is listening a http://localhost:${port}`)
);
require("dotenv").config();

("$TOEKN");


const db = require("quick.db");
const { emotes, emoji } = require("./config.json");
const { EmbedBuilder } = require("discord.js");
const discord = require("discord.js");
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent,
  ],
});

const colors = require("./colors.json");
const yts = require("yt-search");
const fs = require("node:fs");
const { readdirSync } = require("node:fs");
const enmap = require("enmap");

const { guildId } = require("./config.json");

client.queue = new Map();
client.vote = new Map();


// Command Handler
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
["slash-command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

require("./deploy-commands.js");

client.queue = new Map();


client.snipes = new Map();
client.on("messageDelete", function (message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
});



// Giveaway
const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉",
  },
});

client.giveawaysManager = manager;


// Event handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
};


const { Player } = require("discord-music-player");
const player = new Player(client, {
  leaveOnEmpty: false,
});



// Error Handling

process.on("uncaughtException", (err) => {
  let ErrorLoggingChannel = db.get(`ErrorLoggingChannel_${guildId}`);
  if (!ErrorLoggingChannel)
    return console.log(
      `Setup Is Not Done in ${guild} aka ${guild} Guild (channel not found)`
    );

  console.log(err);

  const exceptionembed = new EmbedBuilder()
    .setTitle("Uncaught Exception")
    .setDescription(`\`\`\`${require('util').inspect(err)}\`\`\``)
    .setColor("Red");
  client.channels.cache.get(ErrorLoggingChannel).send({ embeds: [exceptionembed] });
});

process.on("unhandledRejection", (reason, promise) => {
  let ErrorLoggingChannel = db.get(`ErrorLoggingChannel_${guildId}`);
  if (!ErrorLoggingChannel)
    return console.log(
      `Setup Is Not Done in ${guild} aka ${guild} Guild (channel not found)`
    );

  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );

  const rejectionembed = new EmbedBuilder()
    .setTitle("Unhandled Promise Rejection")
    .addFields([
      { name: "Promise", value: `\`\`\`${require('util').inspect(promise).slice(0, 1010)}\`\`\`` },
      { name: "Reason", value: `${reason.message}` }
    ])
    .setColor("Red");
  client.channels.cache.get(ErrorLoggingChannel).send({ embeds: [rejectionembed] });
});

client.player = player;

new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  timeout: 10,
  volume: 150,
  quality: "high",
});

client.login(process.env.TOKEN);
