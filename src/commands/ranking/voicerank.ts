import { Args, Command, PieceContext } from '@sapphire/framework';
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
			name: 'voicerank',
			aliases: ['vr', 'vrank'],
			description: 'Sends your ping',
			detailedDescription: `The ping is the difference between the
            timestamp of your message and the timestamp of the bot message`,
		});
	}
	async run(message: Message, args:Args): Promise<void> {
		const { author, guild } = message;
		const user = await args.pick('user').catch(()=>author);
		const results:VoiceRankingDBResponse = await voiceRankingSchema.findOne({ guildId:guild?.id, userId:user.id }).catch(()=>null);
		console.log(results);
		message.channel.send(`Voice Level - ${results.level}\nLife Time: ${(results.lifeTime) / 60000}`);
	}
}

export default VoiceRank;