const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId } = require('./config.json');
const { readdirSync } = require('node:fs');


let commands = [];
readdirSync("./commands-slash/").forEach(dir => {
    const commandFiles = readdirSync(`./commands-slash/${dir}/`).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands-slash/${dir}/${file}`);
        commands.push(command.data.toJSON());
    };
});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log(`Successfully registered ${commands.length} application commands.`));