import { Args, Command, PieceContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
/**
 * Sends the ping of the bot to the user.
 */
class UserinfoCommand extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'userinfo',
			aliases: ['aboutuser'],
			runIn: 'guild',
			description: 'Sends your ping',
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}
	async run(message: Message, args: Args): Promise<void> {
		const guildUser = message.guild?.members.cache.get(
			`${BigInt((await args.pick('user').catch(() => message.author)).id)}`,
		);
		console.log(guildUser);
		const user = guildUser?.user;

		const userInfoEmbed: MessageEmbed = new MessageEmbed()
			.setTitle(`Information About User ${user?.username}`)
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setColor(EmbedColors.INVISIBLE)
			.setDescription('Hello');
		message.reply({ embeds: [userInfoEmbed] });
	}
}

export default UserinfoCommand;
