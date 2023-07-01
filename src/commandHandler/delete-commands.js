const { REST, Routes } = require('discord.js');
require('dotenv').config();

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_CLIENT_TOKEN);

//----------------------------------------------------------------------------------------
// Deletes all commands in a guild
// Only run this script after you have created commands in a guild and want to delete them
//----------------------------------------------------------------------------------------
rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);