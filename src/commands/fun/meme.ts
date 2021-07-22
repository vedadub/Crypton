import { Command, PieceContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../configs/enums';
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

		// Returns 10 memes from the API, which would give a 99.90% chance of getting a non-NSFW meme
		const response = await (await fetch('https://meme-api.herokuapp.com/gimme/memes/5')).json();

		// The first non-NSFW meme found from the list
		const memeData: MemeResponse = response.memes.find((meme: MemeResponse) => !meme.nsfw);

		const memeEmbed: MessageEmbed = new MessageEmbed()
			.setColor(EmbedColors.INVISIBLE)
			.setAuthor(`${message.client.user?.username || 'Crypton'} Memes`)
			.setImage(memeData.url)
			.setDescription(`**[${memeData.title}](${memeData.url})**`)
			.setFooter(`👍 ${memeData.ups}`)
			.setTimestamp();

		message.channel.send({ embeds:[memeEmbed] });
	}
}

export default Meme;
