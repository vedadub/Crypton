import { Schema, model } from 'mongoose';

const voiceRankingSchema = new Schema({
	guildId:{
		type: String,
		required: true,
		unique: true,
	},
	userId:{
		type: String,
		required: true,
	},
	time:{
		type:Number,
		required:true,
		default:0,
	},
	level:{
		type:Number,
		required:true,
		default:1,
	},

});

export default model('Voice Ranking', voiceRankingSchema);

const voiceTimerSchema = new Schema({
	userId:String,
	guildId:String,
	startTime:Number,
});

export const voiceTimers = model('Voice Timers', voiceTimerSchema);