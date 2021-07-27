import { Listener, PieceContext } from '@sapphire/framework';
import { VoiceState } from 'discord.js';
import { VoiceRanking } from '../utils/classes/VoiceRanking';
/**
 * Logs when the bot is ready to start
 */
class VoiceStateUpdate extends Listener {
	constructor(context: PieceContext) {
		super(context, {
			name: 'voiceStateUpdate',
		});
	}

	async run(oldState:VoiceState, newState:VoiceState): Promise<void> {
		/* Voice Ranking */
		const voiceRanking = new VoiceRanking();
		if((newState.channel?.id || oldState.channel?.id) != newState.guild.afkChannelId) {
			voiceRanking.startReadingTime(oldState, newState);
		}

	}
}

export default VoiceStateUpdate;