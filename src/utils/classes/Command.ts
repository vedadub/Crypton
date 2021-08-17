import { ApplicationCommandData, ApplicationCommandOptionData } from 'discord.js';

interface CommandData extends ApplicationCommandData {
	run: (...args: any) => any;
}

export class Command implements CommandData {
	name: string;
	description: string;
	options?: ApplicationCommandOptionData[];
	defaultPermission?: boolean;
	run: (...args: any) => any;

	constructor(args: CommandData) {
		this.name = args.name;
		this.description = args.description;
		this.options = args.options;
		this.defaultPermission = args.defaultPermission;
		this.run = args.run;
	}
}

