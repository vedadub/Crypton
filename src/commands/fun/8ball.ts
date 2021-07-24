import { Command, PieceContext } from '@sapphire/framework';
import { Message } from 'discord.js';

class ball extends Command {
	constructor(context:PieceContext) {
		super(context, {
			name: '8ball',
			aliases: ['ball'],
			description: '8ball lol',
		});
	}
	async run(message: Message) : Promise<void> {
		const answers = ['Absolutely', 'LOL no', 'Maybe', 'Sure', 'I mean yes-', 'Absolutely no', 'Shut up, no', 'I gotta agree on that one', 'Bruh I\'m too busy'];
		const answer = answers[Math.floor(Math.random() * answers.length)];
		message.channel.send(answer);
	}
}

export default ball;