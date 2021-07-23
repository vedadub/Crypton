import { Listener, PieceContext } from '@sapphire/framework';
import * as mongoose from 'mongoose';
/**
 * Logs when the bot is ready to start
 */
class OnReady extends Listener {
	constructor(context: PieceContext) {
		super(context, {
			name: 'ready',
			once: true,
		});
	}

	async run(): Promise<void> {
		this.container.logger.info('Bot has started!');

		if (process.env.MONGO_URL) {
			await mongoose.connect(process.env.MONGO_URL, {
				keepAlive: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			});
		}
	}
}

export default OnReady;