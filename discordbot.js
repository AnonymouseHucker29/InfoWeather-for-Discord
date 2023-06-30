import { config } from 'dotenv';
import { ActivityType, Client, GatewayIntentBits, Presence } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

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

client.login(process.env.DISCORD_CLIENT_TOKEN);

client.on('messageCreate', message => {

    // check whether the author of the message is the bot itself
    const bot = message.author.bot;

    if (message.content.toLowerCase().includes('hello') && !bot) {
        message.reply(`Hello, ${message.author}!`);
    }
});
