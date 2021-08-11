import { Interaction } from 'discord.js';
import { CryptonClient } from '../utils';
import { Event } from '../utils';

const onInteraction = new Event({
	name: 'interactionCreate',
	once: false,
	async run(interaction: Interaction, client: CryptonClient) {
		if (!interaction.isCommand()) return;
		if (!client.commands.has(interaction.commandName)) return;
		
		await interaction.deferReply();

		try {
			client.commands.get(interaction.commandName)?.run(interaction, client);
		} catch (err) {
			console.error(err);
		}
	},
});

export default onInteraction;
