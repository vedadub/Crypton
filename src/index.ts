import * as dotenv from 'dotenv';
import { Intents } from 'discord.js';
import { readdirSync } from 'fs';
import { CryptonClient } from './utils';

dotenv.config();

const client = new CryptonClient({
	intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

const commandFiles = readdirSync('.crypton/commands').filter((file) => file.endsWith('.js'));
const eventFiles = readdirSync('.crypton/listeners').filter((file) => file.endsWith('.js'));

for (const commandFile of commandFiles) {
	(async () => {
		const command = await import(`./commands/${commandFile}`);
		client.commands.set(command.name, command);
	})();
}

for (const eventFile of eventFiles) {
	(async () => {
		const event = await import(`./listeners/${eventFile}`);
		if (event.once) {
			client.once(event.name, (...args) => event.run(...args, client));
		} else {
			client.on(event.name, (...args) => event.run(...args, client));
		}
	})();
}

client.login(process.env.DISCORD_TOKEN);
process.on('unhandledRejection', (err) => console.log(err));