import { Command, PieceContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../../configs/constants';
import voiceRankingSchema from '../../models/voiceRankingSchema';
import { VoiceRankingDBResponse } from '../../types/voiceDBResponse';
/**
 * Sends the ping of the bot to the user.
 */
class VoiceRank extends Command {
	constructor(context: PieceContext) {
		super(context, {
			name: 'voicelb',
			aliases: ['vlb', 'lbv'],
			runIn:'guild',
			description: 'Sends your ping',
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}
	async run(message: Message): Promise<void> {
		const { guild } = message;
		let desc = '';
		const results:VoiceRankingDBResponse[] = await voiceRankingSchema
			.find({
				guildId:guild?.id,
			})
			.sort({
				level: -1,
				time: -1,
			})
			.limit(10);
		for (let counter = 0; counter < results.length; ++counter) {
			const { userId, level, lifeTime } = results[counter];
			const user = message.guild?.members.cache.get(`${BigInt(userId)}`);
			desc += `**#${counter + 1} ${user?.user.tag} **
            **- Level:** ${level} , **- life voice time:** ${Math.round((lifeTime / 60000))}min
            \n`;
		}
		const voiceLeaderboardEmbed = new MessageEmbed()
			.setTitle(`**Vocie Leadeboard of *${message.guild?.name}* !**`)
			.setColor(EmbedColors.INVISIBLE)
			.setFooter('Leaderboard As of')
			.setTimestamp()
			.setThumbnail(message.guild?.iconURL({ dynamic:true }) || '')
			.setDescription(desc);
		message.reply({ embeds:[voiceLeaderboardEmbed] });
	}

}

export default VoiceRank;