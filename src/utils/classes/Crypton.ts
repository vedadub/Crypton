import * as dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './Command';

export class CryptonClient extends Client {
	commands: Collection<string, Command> = new Collection();
	events: Collection<string, Event> = new Collection();

	constructor(options: ClientOptions) {
		super(options);

		dotenv.config();

		if (process.argv[2] === '--dev' || process.env.NODE_ENV === 'development') {
			this.on('debug', (data) => {
				console.log(data);
			});
		}

		const commandDirectories = readdirSync('.crypton/commands');
		const eventFiles = readdirSync('.crypton/listeners').filter((file) => file.endsWith('.js'));

		for (const commandDirectory of commandDirectories) {
			const thisDirectory = readdirSync(`.crypton/commands/${commandDirectory}`).filter((file) => file.endsWith('.js'));
			for (const commandFile of thisDirectory) {
				(async () => {
					const command = await import(`../../commands/${commandDirectory}/${commandFile}`);
					this.commands.set(command.default.name, command.default);
					this.emit('debug', `Loaded Command: ${command.default.name}`);
				})();
			}
		}

		for (const eventFile of eventFiles) {
			(async () => {
				const event = await import(`../../listeners/${eventFile}`);
				if (event.default.once) {
					this.once(event.default.name, (...args) => event.default.run(...args, this));
				} else {
					this.on(event.default.name, (...args) => event.default.run(...args, this));
				}
				this.emit('debug', `Loaded Event: ${event.default.name}`);
			})();
		}

		process.on('unhandledRejection', (err) => console.log(err));
	}
}
