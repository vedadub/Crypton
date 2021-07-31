import { Args, Command, PieceContext } from '@sapphire/framework';
import { Message } from 'discord.js';
import { cooldownModerationCommands } from '../../types/constants';
import { cannotTakeActionLackPerms, tookActionOnUser, validateCommand } from '../../utils';
/**
 * Sends the ping of the bot to the user.
 */
class KickCommand extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'kick',
			aliases: ['kick'],
			description: 'Sends your ping',
			cooldownDelay: cooldownModerationCommands,
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}
	async run(message: Message, args: Args): Promise<void> {
		const user = await args.pick('user').catch(() => undefined);
		if ((await validateCommand(message, 'KICK_MEMBERS', true, user)) === false) {
			return;
		}
		const reason = await args.rest('string').catch(() => 'No Reason Provided');
		const guildMember = await message.guild?.members.cache.get(`${BigInt(user?.id || '')}`);
		if (!guildMember?.kickable) {
			await cannotTakeActionLackPerms(message);
			return;
		}
		await guildMember.kick(reason);
		tookActionOnUser(message, 'kicked', reason, user);
		return;
	}
}

export default KickCommand;
