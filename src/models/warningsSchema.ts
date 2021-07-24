import { Schema, model } from 'mongoose';

const warningSchema = new Schema({
	guildId: {
		type: String,
		required: true,
		unique: true,
	},
	userId: {
		type: String,
		required: true,
	},
	warnings: {
		type: [Object],
		required: true,
	},
});

export default model('Warnings', warningSchema);
