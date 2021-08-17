import { Intents } from 'discord.js';
import { CryptonClient } from './utils';

const client = new CryptonClient({
	intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

client.login(process.env.DISCORD_TOKEN);