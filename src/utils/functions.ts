import { Message, PermissionResolvable, User } from 'discord.js';
import { noRequiredPermissions, mentionAValidUser } from './embeds';
// import { ValidateCommandOptions } from '../types/ValidateCommandOptions';

export function deleteMessage(message:Message, timeout:number) {
	setTimeout(()=>message.delete(), timeout);
}

export function generateRandomString(length:number) {
	let generatedString = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		generatedString += characters.charAt(Math.floor(Math.random() *
 charactersLength));
	}
	return generatedString;
}

export async function validateCommand(message:Message, permission:PermissionResolvable, userNeeded:boolean, user:User | undefined, permissionNeeded = true) {
	if(permissionNeeded && !message?.member?.permissions.has(permission)) {
		await noRequiredPermissions(permission ? permission?.toString() : '', message);
		return false;
	}
	if(userNeeded && !user) {
		await mentionAValidUser(message);
		return false;
	}
}