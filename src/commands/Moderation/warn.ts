import { Command, PieceContext, Args } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { generateRandomString, deleteMessage } from '../../utils/functions';
import { EmbedColors } from '../../configs/enums';
import warningSchema from '../../models/warningsSchema';
import { Warn } from '../../types/warningDBResponse';
import { error, mentionAValidUser, noRequiredPermissions, actionOnYourself } from '../../utils/embeds';
/**
 * Sends the ping of the bot to the user.
 */
class WarnCommand extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'warn',
			aliases: ['warn'],
			description: 'Warn a user',
			runIn: 'guild',
			cooldownDelay:3000,
		});
	}
	async run(message: Message, args: Args): Promise<void> {
		if(!message.member?.permissions.has('KICK_MEMBERS')) {
			await noRequiredPermissions('KICK_MEMBERS', message);
			return;
		}
		const { author, guild } = message;
		const user = await args.pick('user').catch(()=>undefined);
		const reason = await args.rest('string').catch(()=>undefined);
		if(!user) {
			await mentionAValidUser(message);
			return;
		}
		if(user.id === author.id) {
			await actionOnYourself('warn', message);
			return;
		}
		if(!reason) {
			const noReasonEmbed:MessageEmbed = new MessageEmbed()
				.setDescription('<:CryptonError:814768294795411457> Please give a valid reason to warn a user.')
				.setColor(EmbedColors.ERROR);
			const noReasonMessage = await message.reply({ embeds:[noReasonEmbed] });
			deleteMessage(noReasonMessage, 3000);
			return;
		}
		const warning: Warn = {
			id: generateRandomString(16),
			moderatorId: author.id,
			timestamp: new Date().getTime(),
			reason:`${reason}`,
		};
		await warningSchema
			.findOneAndUpdate(
				{
					guildId: guild?.id,
					userId: user.id,
				},
				{
					guildId: guild?.id,
					userId: user.id,
					$push: {
						warnings: warning,
					},
				},
				{
					upsert: true,
					new:true,
				},
			)
			.catch(() => {
				error(message);
				return;
			});

		const successfullyWarned: MessageEmbed = new MessageEmbed()
			.setColor(EmbedColors.SUCCESS)
			.setDescription(
				`<:CryptonSuccess:814768294849675264> **Successfully warned ${user?.tag}**`,
			);
		message.reply({ embeds: [successfullyWarned] });
		const userDMEmbeb: MessageEmbed = new MessageEmbed()
			.setColor(EmbedColors.ERROR)
			.setDescription(
				`You were warned in ${guild?.name} | **Reason: ${reason}**`,
			);
		user.send({ embeds: [userDMEmbeb] }).catch();
	}
}

export default WarnCommand;
