import { Interaction } from 'discord.js';
import { CryptonClient } from '../utils';
import { Event } from '../utils';

const onInteraction = new Event({
	name: 'interactionCreate',
	once: false,
	async run(interaction: Interaction, client: CryptonClient) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;
		
		await interaction.deferReply();

		const args: any = {};

		if (command.options) {
			command.options.forEach(option => {
				const type = option.type;
				let optionValue: any = interaction.options.get(option.name);
				if (!optionValue) return;
				if (type === 'USER') {
					optionValue = interaction.options.getMember(option.name);
				} else {
					optionValue = optionValue.value;
				}
				args[option.name] = optionValue;
			});
			const subcommand = interaction.options.getSubcommand(false);
			if (subcommand) args['subcommand'] = subcommand;
		};

		console.log(args);

		try {
			command?.run(interaction, args, client);
		} catch (err) {
			console.error(err);
		}
	},
});

export default onInteraction;
