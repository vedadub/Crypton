import { ApplicationCommandData } from 'discord.js';

interface CommandData extends ApplicationCommandData {
	run: (...args: any) => any;
}

export class Command implements CommandData {
	name: string;
	description: string;
	run: (...args: any) => any;

	constructor(args: CommandData) {
		this.name = args.name;
		this.description = args.description;
		this.run = args.run;
	}
}

