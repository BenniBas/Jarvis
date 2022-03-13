import { Message } from "discord.js";

// TODO(Benni): GET THIS BOT IN A DAMN GIT REPOSITORY FIRST THING YOU DISORIENTED LAZY FUCKPLUM! Look at this, you made the bot unuseable you inapt dunce.
// TODO(Benni): Create the classes in a way that both discord Messages and console Messages can be interpreted by the same mechanism. 
// In addition to that, either create a dummy environement to get things like users in voice channels or a cmd command to read current state. Maybe both.
// TODO(Benni): Develop a dispatcher system for parsing messages independent of each other and allowing stateful parsing of commands without baving commands in quick succession disrupt each others parsing.
// TODO(Benni): Implement an actual grammar-using parser. Maybe use ANTLR? (https://tomassetti.me/parsing-in-javascript/)
/**
 * Basic Parser class for parsing discord {@link Message}s without arguments.
 * For messages with arguments, use {@link DiscordMessageParserArgs}.
 */
export abstract class DiscordMessageParser {
    /**
     * Prefix for all commands.
     */
    readonly prefix = '.'

    /**
     * Command name.
     */
    abstract command: string;

    /**
     * Description for the command.
     */
    abstract description: string;

    abstract parse(message: Message)

    abstract validateInput(message: Message)

    matches(message: Message) : Boolean {
        return message.content.startsWith(this.prefix + this.command)
    }

    getArguments(message: Message) : string[] {
        var commandline = message.content.substring(this.prefix.length + this.command.length)
        console.log(`registered commandline: ${commandline}`)
        return commandline.split(' ')
    }
}