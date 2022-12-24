const { readdirSync } = require("fs");
const fs = require('node:fs');
const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    // Read every commands subfolder
    readdirSync("./commands/").forEach(dir => {
        // Filter so we only have .js command files
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        // Loop over the commands, and add all of them to a collection
        // If there's no name found, prevent it from returning an error,
        // By using a cross in the table we made.
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            // If there's an aliases key, read the aliases.
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
        
    });

    
    // Log the table
    console.log(table.toString());
}


/*module.exports = (client) => {
    // Read every commands subfolder
    readdirSync("./commands/").forEach(dir => {
        const { REST } = require('@discordjs/rest');
        const { Routes } = require('discord-api-types/v9');

        const commands = [];
        const commandFiles = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        // Place your client and guild ids here
        const clientId = '946983229674647552';
        const guildId = '885791620878983220';

        for (const file of commandFiles) {
	const command = require(`../commands/${dir}/${file}`);
	commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async () => {
	        try {
		        console.log(`Started refreshing ${commands.length} application (/) commands.`);

		        await rest.put(
			        Routes.applicationCommands(clientId),
			        { body: commands },
		        );

		        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	        } catch (error) {
		        console.error(error);
	        }
        })();
    })
}*/
