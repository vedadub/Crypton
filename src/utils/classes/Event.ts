interface EventOptions {
	name: string;
	once: boolean;
	run: (...args: any) => any;
}

export class Event implements EventOptions {
	name: string;
	once: boolean;
	run: (...args: any) => any;

	constructor(args: EventOptions) {
		this.name = args.name;
		this.once = args.once;
		this.run = args.run;
	}
}
