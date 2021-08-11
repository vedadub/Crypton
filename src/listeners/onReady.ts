import { ApplicationCommandData } from 'discord.js';
import { CryptonClient } from '../utils';
import { Event } from '../utils';

const OnReady = new Event({
	name: 'ready',
	once: true,
	run(client: CryptonClient) {
		client.emit('debug', 'ready!');

		const data: ApplicationCommandData[] = [];

		client.commands.map(command => data.push({
			name: command.name.toLowerCase(),
			description: command.description,
		}));

		client.guilds.cache.forEach(guild => {
			guild.commands.set(data);
		});
	},
});

export default OnReady;
