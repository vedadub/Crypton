import { Interaction } from 'discord.js';
import { CryptonClient } from '../utils';
import { Event } from '../utils';

const onInteraction = new Event({
	name: 'interactionCreate',
	once: false,
	run(interaction: Interaction, client: CryptonClient) {
		if (!interaction.isCommand()) return;

		if (!client.commands.has(interaction.commandName)) return;

		try {
			client.commands.get(interaction.commandName)?.run(interaction, client);
		} catch (err) {
			console.error(err);
		}
	},
});

export default onInteraction;
