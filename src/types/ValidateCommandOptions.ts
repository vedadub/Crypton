import { Message, PermissionResolvable, User } from 'discord.js';

export interface ValidateCommandOptions{
    message:Message;
    permission:PermissionResolvable;
    userNeeded:boolean;
    user:User
}