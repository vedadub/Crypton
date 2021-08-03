import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import { deleteMessage } from '../functions';

export const actionOnYourself = async (action: string, message: Message): Promise<void> => {
	const actionOnYourselfEmbed = new MessageEmbed()
		.setDescription(`<:CryptonError:814768294795411457> You cannot ${action} yourself.`)
		.setColor(EmbedColors.ERROR);
	const actionOnYourselfMessage = await message.reply({
		embeds: [actionOnYourselfEmbed],
	});
	deleteMessage(actionOnYourselfMessage, 3000);
};
