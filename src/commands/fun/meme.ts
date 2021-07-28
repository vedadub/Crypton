import { Command, PieceContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../configs/constants';
import fetch from 'node-fetch';
import MemeResponse from '../../types/MemeResponse';
/**
 * Sends the ping of the bot to the user.
 */
class Meme extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'meme',
			aliases: ['lol'],
			description: 'Sends a Random Meme from Reddit',
			detailedDescription: 'Will Update',
		});
	}

	async run(message: Message) {
		const response = await (await fetch('https://meme-api.herokuapp.com/gimme/wholesomememes/3')).json();
		const memesArray: MemeResponse[] = response.memes.filter((meme: MemeResponse) => meme.nsfw === false);
		const memeData: MemeResponse = memesArray[0];
		const memeEmbed: MessageEmbed = new MessageEmbed()
			.setColor(EmbedColors.INVISIBLE)
			.setAuthor(`${message.client.user?.username || 'Crypton'} Memes`)
			.setImage(memeData.url)
			.setDescription(`**[${memeData.title}](${memeData.url})**`)
			.setFooter(`👍 ${memeData.ups}`)
			.setTimestamp();
		message.reply({ embeds:[memeEmbed] });
	}
}

export default Meme;
