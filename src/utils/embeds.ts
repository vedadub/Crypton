import { Message, MessageEmbed } from 'discord.js';
import { EmbedColors } from '../configs/enums';
import { deleteMessage } from './functions';


export const error = async (message:Message)=>{
	const errorEmbed = new MessageEmbed()
		.setColor(EmbedColors.ERROR)
		.setDescription(
			'<:CryptonError:814768294795411457> Something went wrong! Try again later.',
		);
	const errorMessage = await message.reply({ embeds:[errorEmbed] });
	deleteMessage(errorMessage, 3000);
};

export const mentionAValidUser = async (message:Message) =>{
	const mentionAValidUserEmbed = new MessageEmbed()
		.setColor(EmbedColors.ERROR)
		.setDescription(
			'<:CryptonError:814768294795411457> Please mention a valid user or give a valid user id.',
		);
	const mentionAValidUserMessage = await message.reply({ embeds:[mentionAValidUserEmbed] });
	deleteMessage(mentionAValidUserMessage, 3000);
};

export const noRequiredPermissions = async (requiredPermission:string, message:Message):Promise<void>=>{
	const noRequiredPermissionsEmbed:MessageEmbed = new MessageEmbed()
		.setDescription(`<:CryptonError:814768294795411457> You don't have permissions to run this command\n :small_blue_diamond: Required permission: \`${requiredPermission}\``)
		.setColor(EmbedColors.ERROR);
	const noRequiredPermissionsMessage = await message.reply({ embeds:[noRequiredPermissionsEmbed] });
	deleteMessage(noRequiredPermissionsMessage, 3000);
};

export const actionOnYourself = async (action:string, message:Message):Promise<void> =>{
	const actionOnYourselfEmbed = new MessageEmbed()
		.setDescription(`<:CryptonError:814768294795411457> You cannot ${action} yourself.`)
		.setColor(EmbedColors.ERROR);
	const actionOnYourselfMessage = await message.reply({ embeds:[actionOnYourselfEmbed] });
	deleteMessage(actionOnYourselfMessage, 3000);
};