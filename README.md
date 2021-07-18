# Crypton
Crypton is a discord bot made in JS with discord.js and sapphire
# Command
The basic structure for a comamnd is as:
```ts
import { Command, PieceContext } from "@sapphire/framework";
import { Message } from "discord.js";
/**
 * Description of what the command does
 */
class NameOfCommand extends Command {
    constructor(context: PieceContext) {
        super(context, {
            name: "name",
            aliases: ["any aliases"],
            description: "small overview",
            detailedDescription: `description`,
        });
    }

    async run(message: Message) {
        //code
    }
}

export default NameofCommand;
```
# Event
Basic Structure for event is as:
```ts
import { Listener, PieceContext } from "@sapphire/framework";
/**
 * Description of what the event does
 */
class NameOfEvent extends Listener {
    constructor(context: PieceContext) {
        super(context, {
            name: "NameOfEvent",
            once: true or false,
        });
    }

    async run() {
        //code
    }
}

export default OnReady;
```