import { Command, PieceContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import JokeResponse from '../../types/JokeResponse';
import fetch from 'node-fetch';

class Ping extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'joke',
			aliases: ['haha'],
			description: 'Sends a Random Joke',
			detailedDescription: 'update soon',
		});
	}

	async run(message: Message): Promise<void> {
		// API Request to get a random joke
		const response: JokeResponse = await (
			await fetch('https://official-joke-api.appspot.com/random_joke')
		).json();
		const jokeEmbed: MessageEmbed = new MessageEmbed()
			.setColor(EmbedColors.INVISIBLE)
			.setAuthor(`${message.client.user?.username || 'Crypton'} Jokes`)
			.setDescription(`**${response.setup}** \n ${response.punchline}`);

		message.channel.send({ embeds: [jokeEmbed] });
	}
}

export default Ping;
