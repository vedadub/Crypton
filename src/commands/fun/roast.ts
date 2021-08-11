import { Command } from '../../utils';
import { CommandInteraction } from 'discord.js';

const roast = new Command({
	name: 'roast',
	description: 'Roasts anyone',
	options: [{
		name: 'user',
		description: 'The target user',
		type: 'USER',
	}],
	async run(interaction: CommandInteraction, args: any) {
		const user = interaction.guild?.members.resolve(args.user).user || interaction.user;
		const answers = [
			'Sup normie?',
			'Hey idiot',
			'whats up noob',
			'Did i ask?',
			'I dont care',
			'Another idiot',
			'The king of loosers',
			'BOOMER',
			'Novice',
			'Normie be like',
			'Sup edot',
			'Man you should see a mental doctor',
			'I am calling FBI now',
			'I gotta say you are pretty dumb',
		];
		const answer = answers[Math.floor(Math.random() * answers.length)];

		interaction.editReply(`${user.username}, ${answer}`);
	},
});

export default roast;
