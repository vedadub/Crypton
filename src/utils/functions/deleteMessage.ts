import { Message } from 'discord.js';

export function deleteMessage(message: Message, timeout: number) {
	setTimeout(() => message.delete(), timeout);
}
