import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './Command';

export class CryptonClient extends Client {
	commands: Collection<string, Command>;
	events: Collection<string, Event>;

	constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
		this.events = new Collection();
	}
}
