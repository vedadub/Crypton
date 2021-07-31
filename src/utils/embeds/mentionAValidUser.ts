import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import { deleteMessage } from '../functions';

export const mentionAValidUser = async (message: Message) => {
	const mentionAValidUserEmbed = new MessageEmbed()
		.setColor(EmbedColors.ERROR)
		.setDescription(
			'<:CryptonError:814768294795411457> Please mention a valid user or give a valid user id.',
		);
	const mentionAValidUserMessage = await message.reply({
		embeds: [mentionAValidUserEmbed],
	});
	deleteMessage(mentionAValidUserMessage, 3000);
};
