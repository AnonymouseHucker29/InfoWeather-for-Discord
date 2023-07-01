const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'square_root',
        description: 'Finds the square root of a given number',
        options: [
            {
                name: 'number',
                description: 'The number to find the square root of',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'weather',
        description: 'Gets the weather for a given location',
        options: [
            {
                name: 'location',
                description: 'The location to get the weather for',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
];

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_CLIENT_TOKEN);

// Deploy your commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('Error refreshing application commands:', error);
    }
})();
