import { Command } from '../../utils';
import { CommandInteraction } from 'discord.js';

const command = new Command({
	name: '8ball',
	description: 'An eight ball command that does random things',
	async run(interaction: CommandInteraction) {
		const answers = [
			'Absolutely',
			'no',
			'Maybe',
			'Sure',
			'Yes',
			'Alright thats just not',
			'Shut up, he is kinda correct',
			'I gotta agree on that one',
			'Too busy for that one',
		];
		const answer = answers[Math.floor(Math.random() * answers.length)];
		interaction.editReply(answer);
	},
});

export default command;
