import { Command } from '../../utils';
import { CommandInteraction } from 'discord.js';
import factResponse from '../../types/factResponse';
import fetch from 'node-fetch';

const Fact = new Command({
	name: 'fact',
	description: 'Useless facts for useless people',
	async run(interaction: CommandInteraction) {
		// API Request to get a random fact
		const response: factResponse = await (
			await fetch('https://useless-facts.sameerkumar.website/api')
		).json();

		interaction.editReply(`${response.data}`);
	},
});

export default Fact;
