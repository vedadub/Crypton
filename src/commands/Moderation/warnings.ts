import { Command, PieceContext, Args } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../types/constants';
import { prisma, noRequiredPermissions } from '../../utils';
/**
 * Sends the ping of the bot to the user.
 */
class WarnCommand extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'warnings',
			aliases: ['warnings'],
			description: 'Get Warnings of a User',
			runIn: 'guild',
			cooldownDelay: 3000,
		});
	}
	async run(message: Message, args: Args): Promise<void> {
		const { guild, member, author } = message;
		const user = await args.pick('user').catch(() => author);

		if (!member?.permissions.has('KICK_MEMBERS')) {
			await noRequiredPermissions('KICK_MEMBERS', message);
			return;
		}

		const results = await prisma.warningSchema.findFirst({
			where: {
				guildId: guild?.id,
				userId: user?.id,
			},
		});

		if (!results || !results.warnings.length) {
			const noWarnings = new MessageEmbed()
				.setColor(EmbedColors.INVISIBLE)
				.setDescription(`<:CryptonInfo:868051794633306154> No warns for ${user?.tag}`);
			message.reply({ embeds: [noWarnings] });
			return;
		}

		let reply = '';
		let warnNum = 1;

		for await (const warning of results.warnings) {
			const { moderatorId, timestamp, reason, id } = warning as any;
			const moderator =
				message.client.users.cache.get(`${BigInt(moderatorId)}`) ||
				(await message.client.users.fetch(`${BigInt(moderatorId)}`));
			reply += `${warnNum}) **ID  :**  ${id} \n**On  :**  ${new Date(
				timestamp,
			).toDateString()} | **Warned By  :** ${moderator.username}#${
				moderator.discriminator
			} \n**Reason  :**  '${reason}'\n\n`;
			warnNum++;
		}

		const listOfWarningsEmbed: MessageEmbed = new MessageEmbed()
			.setAuthor(
				`${results.warnings.length} Warnings for ${user?.tag} (${user?.id})`,
				user?.displayAvatarURL({ dynamic: true }),
			)
			.setColor(EmbedColors.INVISIBLE)
			.setDescription(reply);

		message.reply({ embeds: [listOfWarningsEmbed] });
	}
}

export default WarnCommand;
