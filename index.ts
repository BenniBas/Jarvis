import { Message } from "discord.js"
import { TeamsParser } from "./teams_parser"

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

const command_prefix = '.'

const command_hello = `${command_prefix}hello`
const command_hello_jarvis = 'jarvis'
const command_hello_reply_world = 'world!'
const command_hello_reply_hello = 'Hello'

const command_who = `${command_prefix}who`

const command_teams = `${command_prefix}teams`

const command_help = 'help'
const command_help_output = 
`My name is Jarvis, at your service.

Commands:
${command_hello} - Displays this dialog.
${command_who} - Lists all members in your current voice channel.
${command_teams} x - Splits all members in your current voice channel into x teams. (Default 2) - Not yet implemented
`


const teamsParser = new TeamsParser()

client.on('ready', () => {
    console.log('Hello Sir, how may I be of service?')
})

client.on('messageCreate', async (message: Message) => {
    console.log(`registered message - ${message.content}`)

    if(!message.content.startsWith(command_prefix))
        return

    console.log('message is command')
    if(message.content.toLowerCase().startsWith(command_hello)) {
        console.log(`message starts with ${command_hello}`)
        var restContent = message.content.substring(command_hello.length).trim()
        parseHello(message, restContent)
    } else if (message.content.toLowerCase().startsWith(command_who)) {
        parseWho(message)
    } else if (teamsParser.matches(message)) {
        teamsParser.parse(message)
    }
})

function parseHello(message: Message, restContent: string) {
    console.log('parsing hello')

    if(restContent == '') {
        message.reply(command_hello_reply_world)
    } else if (restContent == command_hello_jarvis) {
        message.reply(`${command_hello_reply_hello} ${message.author.username}`)
    }
}

function parseWho(message: Message) {
    var names = ''
    message.member.voice.channel.members.forEach(element => {
        names += element.displayName + "\n"
    });

    message.reply(names)
}

function isTeams(message: Message) : boolean {
    return message.content.toLowerCase().startsWith(command_prefix + command_teams)
}

client.login('OTQ5NzA2NDgzOTUwNTc1Njk2.YiORFg.hCGExfCn_vYwIRTOUZgClhtc6q0')