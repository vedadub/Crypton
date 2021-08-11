import { Command } from '../../utils';
import { CommandInteraction } from 'discord.js';
import JokeResponse from '../../types/JokeResponse';
import fetch from 'node-fetch';

const Ping = new Command({
	name: 'joke',
	description: 'Sends a Random Joke',
	async run(interaction: CommandInteraction) {
		// API Request to get a random joke
		const response: JokeResponse = await (
			await fetch('https://official-joke-api.appspot.com/random_joke')
		).json();

		interaction.editReply(`**${response.setup}**\n ${response.punchline}`);
	},
});

export default Ping;
