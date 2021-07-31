import { Message, MessageEmbed, User } from 'discord.js';
import { EmbedColors } from '../../types/constants';

export const tookActionOnUser = async (
	message: Message,
	action: string,
	reason: string,
	user?: User,
) => {
	const tookActionOnUserEmbed = new MessageEmbed()
		.setColor(EmbedColors.SUCCESS)
		.setDescription(
			`<:CryptonSuccess:814768294849675264> **${user?.tag} was ${action} | ${reason}**`,
		);
	message.reply({ embeds: [tookActionOnUserEmbed] });
};
