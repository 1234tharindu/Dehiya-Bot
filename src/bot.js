const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("bot online yay boy!!"));

app.listen(port, () =>
    console.log(`Your app is listening a http://localhost:${port}`)
);

require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { readdirSync } = require('fs');
const { connect, set } = require('mongoose');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
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

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

client.config = require('../config.json');
const { QuickDB } = require("quick.db");
client.db = new QuickDB();

// Functions
const functionsFolders = readdirSync('./src/functions');
for (const folder of functionsFolders) {
    const functionFiles = readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'))
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client)
};

client.handleEvents();
client.handleCommands();
client.handleComponents();

client.login(process.env.TOKEN);

set('strictQuery', true);
connect(process.env.MONGOURL);