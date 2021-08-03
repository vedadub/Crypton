import { Command, PieceContext, Args } from '@sapphire/framework';
import { Message } from 'discord.js';
/**
 * Sends the ping of the bot to the user.
 */
class StealCommand extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'steal',
			description: 'steals an emoji',
		});
	}
	async run(message: Message, args: Args) {
		const emojiString = await args.pick('string').catch(() => undefined);
		
		if (!emojiString) return this.notFound(message);

		const regexEmojiString = emojiString.match(/<:\w+:(\d+)>/);

		if (!regexEmojiString) return this.notFound(message);

		const emojiId = emojiString[1];
		const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.png?v=1`;
		message.reply(emojiUrl);
	}

	private notFound(message: Message) {
		message.reply('Emoji not found!');
	}
}

export default StealCommand;
