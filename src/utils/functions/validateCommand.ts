import { Message, PermissionResolvable, User } from 'discord.js';
import { noRequiredPermissions, mentionAValidUser } from '../embeds';

export async function validateCommand(
	message: Message,
	permission: PermissionResolvable,
	userNeeded: boolean,
	user: User | undefined,
	permissionNeeded = true,
) {
	if (permissionNeeded && !message?.member?.permissions.has(permission)) {
		await noRequiredPermissions(
			permission ? permission?.toString() : '',
			message,
		);
		return false;
	}
	if (userNeeded && !user) {
		await mentionAValidUser(message);
		return false;
	}
}
