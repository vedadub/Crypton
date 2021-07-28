/* eslint-disable no-mixed-spaces-and-tabs */
import voiceRankingSchema, {
	voiceTimers,
} from '../../models/voiceRankingSchema';
import { VoiceState } from 'discord.js';
import { CallbackError } from 'mongoose';
import { VoiceRankingDBResponse } from '../../types/voiceDBResponse';

export class VoiceRanking {
	public async startReadingTime(oldState: VoiceState, newState: VoiceState) {
		if (newState.member?.user.bot) return;
		const userId = newState.member?.id;
		const guildId = newState.guild.id;
		if (
			newState.channel &&
            !(await voiceTimers.findOne({ userId, guildId }))
		) {
			new voiceTimers({ userId, guildId, startTime: Date.now() }).save();
		}
		if (oldState.channel?.id && !newState.channel?.id) {
			await voiceTimers.findOne(
				{ userId, guildId },
				async (err: CallbackError, timeData: any) => {
					const totalTimeInVc = Date.now() - timeData.startTime;
					timeData.delete();
					const results: VoiceRankingDBResponse =
                        await voiceRankingSchema
                        	.findOneAndUpdate(
                        		{ userId, guildId },
                        		{
                        			userId,
                        			guildId,
                        			$inc: { time: totalTimeInVc, lifeTime:totalTimeInVc },
                        		},
                        		{ upsert: true, new: true },
                        	)
                        	.catch(() => null);
					let { time, level } = results;
					const neededToLevel = this.minsToLevelUp(level);

					if (time >= neededToLevel) {
						++level;
						time -= neededToLevel;
					}
					await voiceRankingSchema.updateOne(
						{
							guildId,
							userId,
						},
						{
							level,
							time,
						},
					);
				},
			);
		}
	}
	private minsToLevelUp(level: number) {
		return (level * level) * 60000;
	}
}
