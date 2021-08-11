import { Command } from '../../utils';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
/**
 * Sends the ping of the bot to the user.
 */
const Avatar = new Command({
	name: 'avatar',
	description: 'Shows the persons profile pic',
	async run(interaction: CommandInteraction) {
		const user = interaction.user;
		const userAvatar = user.displayAvatarURL({ dynamic: true, size: 256 });
		const avatarCommandReplyEmbed: MessageEmbed = new MessageEmbed()
			.setImage(userAvatar)
			.setColor(EmbedColors.INVISIBLE)
			.setTitle('Looking good today!');
		interaction.editReply({ embeds: [avatarCommandReplyEmbed] });
	},
});

export default Avatar;
