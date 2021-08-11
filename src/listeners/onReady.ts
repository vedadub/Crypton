import { ApplicationCommandData } from 'discord.js';
import { CryptonClient } from '../utils';
import { Event } from '../utils';

const OnReady = new Event({
	name: 'ready',
	once: true,
	run(client: CryptonClient) {
		console.log('Ready!');

		const data: ApplicationCommandData[] = [];

		client.commands.map(command => data.push({
			name: command.name,
			description: command.description,
		}));

		client.application?.commands.set(data);
	},
});

export default OnReady;
