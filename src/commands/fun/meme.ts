import { Command, PieceContext } from "@sapphire/framework";
import { Message,MessageEmbed } from "discord.js";
import {EmbedColors} from "../../configs/enums"
import fetch from "node-fetch"
import MemeResponse from "../../types/MemeResponse"
/**
 * Sends the ping of the bot to the user.
 */
class Meme extends Command {
    constructor(context: PieceContext) {
        super(context, {
            name: "meme",
            aliases: ["lol"],
            description: "Sends a Random Meme from Reddit",
            detailedDescription: `Will Update`,
        });
    }

    async run(message: Message) {
        const response =await (await fetch("https://meme-api.herokuapp.com/gimme/memes/2")).json();
        const memesArray:MemeResponse[] = response.memes;
        let memeData:MemeResponse;
        if(memesArray[0].nsfw === true){
            memeData = memesArray[1];
        } else {
            memeData = memesArray[0]
        }
       const memeEmbed:MessageEmbed = new MessageEmbed()
       .setColor(EmbedColors.INVISIBLE)
       .setAuthor(`${message.client.user?.username || "Crypton"} Memes`)
       .setImage(memeData.url)
       .setDescription(`**[${memeData.title}](${memeData.url})**`)
       .setFooter(`👍 ${memeData.ups} | We are Not Responsible if the meme is controversial`)
        message.channel.send({embeds:[memeEmbed]})
    }
}

export default Meme;