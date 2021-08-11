import { Command } from '../../utils';
import { CommandInteraction } from 'discord.js';

const command = new Command({
	name: '8ball',
	description: '8ball lol',
	async run(interaction: CommandInteraction) {
		const answers = [
			'Absolutely',
			'LOL no',
			'Maybe',
			'Sure',
			'I mean yes-',
			'Absolutely no',
			'Shut up, no',
			'I gotta agree on that one',
			'Bruh I am too busy',
		];
		const answer = answers[Math.floor(Math.random() * answers.length)];
		interaction.editReply(answer);
	},
});

export default command;
