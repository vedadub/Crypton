import { Guild, TextChannel } from 'discord.js';

export async function createInvite(guild:Guild |null) {
	const invites = await guild?.invites.fetch();
	const myInv = invites?.find(inv=>inv.inviter?.id === '804588003791208478');
	if(!myInv) {
		const channel = guild?.channels.cache.find(c => c.type === 'GUILD_TEXT');
		if (!channel) return;
		return await (channel as TextChannel).createInvite({ maxAge:0 });
	}
	const invite = `https://discord.gg/${myInv.code}`;
	return invite;
}