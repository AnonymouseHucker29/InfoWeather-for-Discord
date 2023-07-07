require('dotenv').config();
const { ActivityType, Client, GatewayIntentBits } = require('discord.js');
const { weatherHelper } = require('./helpers/weatherHelper.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is ready to serve ${c.guilds.cache.size} guild(s) with ${c.users.cache.size} users.`);

    client.user.setPresence({
        activities: [{ name: 'the weather today :)', type: ActivityType.Watching }],
        status: 'idle',
    });

    /** Use only if you want to change the bot's username
     * 
     *  client.user.setUsername('New Username')
     *      .then(user => console.log(`My new username is ${user.username}`))
     *      .catch(console.error);
    **/
});

client.on('messageCreate', (message) => {

    // check whether the author of the message is the bot itself
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes('hello') || message.content.toLowerCase().includes('hey') || message.content.toLowerCase().includes('hi')) {
        message.reply(`Hello, ${message.author}!\nType /weather <location> to get real-time weather information for a given location.`);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'square_root') {
        const number = interaction.options.getNumber('number');
        await interaction.reply(`The square root of ${number} is ${Math.sqrt(number)}.`);
    }
    else if (interaction.commandName === 'weather') {
        weatherHelper(interaction);
    }
});

client.login(process.env.DISCORD_CLIENT_TOKEN);