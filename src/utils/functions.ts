import { randomBytes } from 'crypto';
import { Message } from 'discord.js';

export function generateRandomString(length:number) {
	const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
	const characterCount = characters.length;
	const maxValidSelector =
      Math.floor(0x10000 / characterCount) * characterCount - 1;
	const entropyLength = 2 * Math.ceil(1.1 * length);
	let string = '';
	let stringLength = 0;

	while (stringLength < length) {
		const entropy = randomBytes(entropyLength);
		let entropyPosition = 0;

		while (entropyPosition < entropyLength && stringLength < length) {
			const entropyValue = entropy.readUInt16LE(entropyPosition);
			entropyPosition += 2;
			if (entropyValue > maxValidSelector) {
				continue;
			}

			string += characters[entropyValue % characterCount];
			stringLength++;
		}
	}

	return string;
}

export function deleteMessage(message:Message, timeout:number) {
	setTimeout(()=>message.delete(), timeout);
}