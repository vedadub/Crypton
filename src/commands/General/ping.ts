import { Command, PieceContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../configs/constants';
/**
 * Sends the ping of the bot to the user.
 */
class Ping extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'ping',
			aliases: ['beep'],
			description: 'Sends your ping',
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}
	async run(message: Message): Promise<void> {
		const pingEmbed: MessageEmbed = new MessageEmbed()
			.setDescription('Calculating Ping')
			.setColor(EmbedColors.ERROR);
		const botMessage = await message.reply({ embeds: [pingEmbed] });
		botMessage.edit({ embeds: [pingEmbed.setDescription(`BOT:${Math.round(message.client.ws.ping)}ms\nAPI:${botMessage.createdTimestamp - message.createdTimestamp}ms`)] });
	}
}

export default Ping;