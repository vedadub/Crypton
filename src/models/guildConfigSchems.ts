import { Schema, model } from 'mongoose';

const guildConfigSchema = new Schema({
	id:{
		type:String,
		required:true,
		unique:true,
	},
	prefix:{
		type:String,
		required:true,
		default:'?',
	},

});

export default model('Guild Configs', guildConfigSchema);