import { Command } from '../../utils';
import { CommandInteraction } from 'discord.js';
/**
 * Sends the ping of the bot to the user.
 */
const Ping = new Command({
	name: 'ping',
	description: 'Sends your ping',
	run(interaction: CommandInteraction) {
		interaction.editReply(`${interaction.client.ws.ping}`);
	},
});

export default Ping;
