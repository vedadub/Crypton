import { Command } from '../../utils';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import fetch from 'node-fetch';
import MemeResponse from '../../types/MemeResponse';
/**
 * Sends the ping of the bot to the user.
 */
const Meme = new Command({
	name: 'meme',
	description: 'Sends a Random Meme from Reddit',
	async run(interaction: CommandInteraction) {
		const response = await (
			await fetch('https://meme-api.herokuapp.com/gimme/wholesomememes/3')
		).json();
		const memesArray: MemeResponse[] = response.memes.filter(
			(meme: MemeResponse) => meme.nsfw === false,
		);
		const memeData: MemeResponse = memesArray[0];
		const memeEmbed: MessageEmbed = new MessageEmbed()
			.setColor(EmbedColors.INVISIBLE)
			.setAuthor(`${interaction.client.user?.username || 'Crypton'} Memes`)
			.setImage(memeData.url)
			.setDescription(`**[${memeData.title}](${memeData.url})**`)
			.setFooter(`👍 ${memeData.ups}`)
			.setTimestamp();
		interaction.editReply({ embeds: [memeEmbed] });
	},
});

export default Meme;
