import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import { deleteMessage } from '../functions';

export const cannotTakeActionLackPerms = async (message: Message) => {
	const cannotTakeActionLackPermsEmbed = new MessageEmbed()
		.setDescription(
			'<:CryptonError:814768294795411457> I cannot take this action due to lack of permissions.',
		)
		.setColor(EmbedColors.ERROR);
	const actionOnYourselfMessage = await message.reply({
		embeds: [cannotTakeActionLackPermsEmbed],
	});
	deleteMessage(actionOnYourselfMessage, 3000);
	return;
};
