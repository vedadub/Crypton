import { Command, PieceContext, Args } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
/**
 * Sends the ping of the bot to the user.
 */
class Avatar extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'avatar',
			aliases: ['av', 'dp', 'pfp'],
			description: 'Shows the persons profile pic',
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}
	async run(message: Message, args: Args): Promise<void> {
		const user = await args.pick('user').catch(() => message.author);
		const userAvatar = user.displayAvatarURL({ dynamic: true, size: 256 });
		const avatarCommandReplyEmbed: MessageEmbed = new MessageEmbed()
			.setImage(userAvatar)
			.setColor(EmbedColors.INVISIBLE)
			.setTitle('Looking good today!');
		message.reply({ embeds: [avatarCommandReplyEmbed] });
	}
}

export default Avatar;
