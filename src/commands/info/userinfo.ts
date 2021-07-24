import { Command, PieceContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../configs/enums';
/**
 * Sends the ping of the bot to the user.
 */
class Ping extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'userinfo',
			aliases: ['aboutuser'],
			description: 'Sends your ping',
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}
	async run(message: Message): Promise<void> {
		const discordUser = message.mentions.users.first() || message.author;
		const guildUser = message.guild?.members.cache.get(discordUser.id);
		const userInfoEmbed:MessageEmbed = new MessageEmbed()
			.setTitle(`Information About User ${discordUser.username}`)
			.setColor(EmbedColors.INVISIBLE)
			.setDescription('Hello');
		message.reply({ embeds:[userInfoEmbed] });
	}
}

export default Ping;