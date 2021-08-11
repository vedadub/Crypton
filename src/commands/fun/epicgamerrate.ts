import { Command } from '../../utils';
import { CommandInteraction } from 'discord.js';

const epic = new Command({
	name: 'epicgamerrate',
	description: 'epiccc',
	async run(interaction: CommandInteraction) {
		const user = interaction.user;
		const answer = Math.floor(Math.random() * 100);
		interaction.editReply(`${user.username} is ${answer}%  Epicgamer :sunglasses:!`);
	},
});

export default epic;
