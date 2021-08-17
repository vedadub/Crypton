import { Command } from '../../utils';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
/**
 * Sends the ping of the bot to the user.
 */
const UserinfoCommand = new Command({
	name: 'userinfo',
	description: 'Sends your ping',
	options: [{
		name: 'user',
		description: 'The target user',
		type: 'USER',
	}],
	async run(interaction: CommandInteraction, args: any) {
		const user = interaction.guild?.members.resolve(args.user)?.user || interaction.user;
		const userInfoEmbed: MessageEmbed = new MessageEmbed()
			.setTitle(`Information About User ${user?.username}`)
			.setThumbnail(user?.displayAvatarURL({ dynamic: true }) || '')
			.setColor(EmbedColors.INVISIBLE)
			.setDescription('Hello');
		interaction.editReply({ embeds: [userInfoEmbed] });
	},
});

export default UserinfoCommand;
