const { REST, Routes } = require('discord.js');
const fs = require('fs');
let commandsArray = [];

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandsFiles = fs.readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));
            for (const file of commandsFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                commandsArray.push(command.data.toJSON());
            }
        }
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        try {
            console.log(`\x1B[93mStarted refreshing application (/) Commands...\x1B[39m`);

            await rest.put(Routes.applicationCommands(client.config.clientId), { body: commandsArray });
            console.log(`\x1B[92mSuccessfully reloadeded ${commandsArray.length} application (/) Commands\x1B[39m`);

        } catch (err) {
            console.log(err);
        }
    };
};