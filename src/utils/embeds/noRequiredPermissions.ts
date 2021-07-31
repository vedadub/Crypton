import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import { deleteMessage } from '../functions';

export const noRequiredPermissions = async (
	requiredPermission: string,
	message: Message,
): Promise<void> => {
	const noRequiredPermissionsEmbed: MessageEmbed = new MessageEmbed()
		.setDescription(
			`<:CryptonError:814768294795411457> You don't have permissions to run this command\n :small_blue_diamond: Required permission: \`${requiredPermission}\``,
		)
		.setColor(EmbedColors.ERROR);
	const noRequiredPermissionsMessage = await message.reply({
		embeds: [noRequiredPermissionsEmbed],
	});
	deleteMessage(noRequiredPermissionsMessage, 3000);
};
