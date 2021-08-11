import { Command } from '../../utils';
import { CommandInteraction } from 'discord.js';

const epic = new Command({
	name: 'epicgamerrate',
	description: 'epiccc',
	options: [{
		name: 'user',
		description: 'The target user',
		type: 'USER',
	}],
	async run(interaction: CommandInteraction, args: any) {
		const user = interaction.guild?.members.resolve(args.user).user || interaction.user;
		const answer = Math.floor(Math.random() * 100);
		interaction.editReply(`${user.username} is ${answer}%  Epicgamer :sunglasses:!`);
	},
});

export default epic;
