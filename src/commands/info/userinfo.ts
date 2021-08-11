import { Command } from '../../utils';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
/**
 * Sends the ping of the bot to the user.
 */
const UserinfoCommand = new Command({
	name: 'userinfo',
	description: 'Sends your ping',
	async run(interaction: CommandInteraction) {
		const user = interaction.user;
		const userInfoEmbed: MessageEmbed = new MessageEmbed()
			.setTitle(`Information About User ${user?.username}`)
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setColor(EmbedColors.INVISIBLE)
			.setDescription('Hello');
		interaction.editReply({ embeds: [userInfoEmbed] });
	},
});

export default UserinfoCommand;
