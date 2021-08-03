import { Command, PieceContext, Args } from '@sapphire/framework';
import { Message } from 'discord.js';

class roast extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'roast',
			cooldownDelay: 3000,
			aliases: ['roast'],
			description: 'It roasts people bruh',
		});
	}
	async run(message: Message, args: Args): Promise<void> {
		const user = await args.pick('user').catch(() => message.author);
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

		message.channel.send(`${user.username}, ${answer}`);
	}
}

export default roast;
