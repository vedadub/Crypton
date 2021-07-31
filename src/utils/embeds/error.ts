import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import { deleteMessage } from '../functions';

export const error = async (message: Message) => {
	const errorEmbed = new MessageEmbed()
		.setColor(EmbedColors.ERROR)
		.setDescription(
			'<:CryptonError:814768294795411457> Something went wrong! Try again later.',
		);
	const errorMessage = await message.reply({ embeds: [errorEmbed] });
	deleteMessage(errorMessage, 3000);
};
