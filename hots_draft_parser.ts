import { Message } from "discord.js";
import { DiscordMessageParser } from "./parser";

export class TeamsParser extends DiscordMessageParser {
    command: string = ".draft"
    
    parse(message: Message<boolean>) {
        
    }
}