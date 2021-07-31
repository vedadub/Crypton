import { Args, Command, PieceContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import { prisma, noRequiredPermissions, deleteMessage } from '../../utils';
/**
 * Sends the ping of the bot to the user.
 */
class DeleteWarnCommand extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'delwarn',
			aliases: ['delwarn'],
			cooldownDelay: 3000,
			description: 'Sends your ping',
			preconditions: ['GuildOnly'],
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}

	async run(message: Message, args: Args): Promise<void> {
		const { guild, member } = message;

		if (!guild) return;

		if (!member?.permissions.has('KICK_MEMBERS')) {
			await noRequiredPermissions('KICK_MEMBERS', message);
			return;
		}

		const warnId = await args.pick('string').catch(() => undefined);
		if (!warnId) {
			const notAValidId: MessageEmbed = new MessageEmbed()
				.setDescription(
					'<:CryptonError:814768294795411457> Enter a valid warn id to delete warn',
				)
				.setColor(EmbedColors.ERROR);
			const notAValidIdMessage = await message.reply({ embeds: [notAValidId] });
			deleteMessage(notAValidIdMessage, 3000);
			return;
		}

		const results = await prisma.warningSchema.findFirst({
			where: {
				guildId: guild.id,
				userId: member.id,
			},
		});

		if (!results?.warnings.find((warn: any) => warn.id === warnId)) {
			const notAValidId: MessageEmbed = new MessageEmbed()
				.setDescription(
					'<:CryptonError:814768294795411457> No warn found with the provided id, re-check the id and try again.',
				)
				.setColor(EmbedColors.ERROR);
			const notAValidIdMessage = await message.reply({ embeds: [notAValidId] });
			deleteMessage(notAValidIdMessage, 3000);
			return;
		}

		await prisma.warningSchema.update({
			where: {
				guildId: guild.id,
				userId: member.id,
			},
			data: {
				warnings: results.warnings.filter((warn: any) => warn.id != warnId),
			},
		});

		const warn: any = results.warnings[0]!;
		const user =
			message.client.users.cache.get(`${BigInt(results.userId)}`) ||
			(await message.client.users.fetch(`${BigInt(results.userId)}`));
		const successfullyDeletedWarn: MessageEmbed = new MessageEmbed()
			.setColor(EmbedColors.SUCCESS)
			.setDescription(
				`<:CryptonSuccess:814768294849675264> Deleted Warning \`${warn?.id}\` for ${user.tag} `,
			);
		message.reply({ embeds: [successfullyDeletedWarn] });
	}
}

export default DeleteWarnCommand;
