import { Args, Command, PieceContext } from '@sapphire/framework';
import { Message } from 'discord.js';

class epic extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'epicgamerrate',
			aliases: ['Epic'],
			description: 'epiccc',
		});
	}
	async run(message: Message, args: Args): Promise<void> {
		const user = await args.pick('user').catch(() => message.author);
		const answer = Math.floor(Math.random() * 100);
		if (user) {
			message.channel.send(`${user.username} is ${answer}%  Epicgamer :sunglasses:!`);
		} else {
			message.channel.send(`You are ${answer}% Epicgamer :sunglasses:!`);
		}
	}
}

export default epic;
