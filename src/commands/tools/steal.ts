import { Command, PieceContext } from '@sapphire/framework';
// import { Message } from 'discord.js';
/**
 * Sends the ping of the bot to the user.
 */
class StealCommand extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'ping',
			aliases: ['beep'],
			description: 'Sends your ping',
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}
	async run() {
		// const emojiString = args.pick('string')
		// const emojiId = emojiString.match(/<:\w+:(\d+)>/)[1];
		// const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.png?v=1`;
	}
}

export default StealCommand;
