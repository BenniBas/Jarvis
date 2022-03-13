import { Message } from "discord.js";
import { DiscordMessageParser } from "./parser";

export class TeamsParser extends DiscordMessageParser {
    description: string;
    
    validateInput(message: Message<boolean>) {
        throw new Error("Method not implemented.");
    }
    command = 'teams'

    parse(message: Message) {
        var teamCount: number
        var args = this.getArguments(message)

        console.log((`registered arguments ${args.toString()}`))

        if(args == null || args.length == 0 || args[0] == '') {
            teamCount = 2
        } else if (args.length == 1) {
            teamCount = Number.parseInt(args[0])
        } else {
            message.channel.send(`Too many arguments passed for \'${this.command}\'-command`)
        }

        var members: string[] = []

        console.log('Setting member names to array...')

        message.member.voice.channel.members.forEach(element => {
            members.push(element.displayName)
            console.log(element.displayName)
        });

        var randomMembers = this.shuffleMembers(members)

        var teams = this.splitTeams(randomMembers, teamCount)
        var output = this.getTeamsOutputString(teams)

        message.reply(output)
    }

    private shuffleMembers(array: string[]) : string[] {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    private splitTeams(randomMembers: string[], teamCount: number) : string[][] {
        var teams: string[][] = []

        for (let i = 0, j = 0; i < randomMembers.length; i++, j = this.incrementReset(j, teamCount-1)) {
            if(!teams[j]) {
                teams[j] = []
            }
            teams[j].push(randomMembers[i])
            console.log(`Team ${j} adds ${randomMembers[i]}`)
        }

        return teams
    }

    private incrementReset(j: number, max: number) : number{
        if(j < max) {
            return j+1
        } else {
            return 0
        }
    }

    private getTeamsOutputString(teams: string[][]) : string {
        var output = ''

        for (let i = 0; i < teams.length; i++) {
            output += `Team ${i+1}:\n`

            for(let j = 0; j < teams[i].length; j++) {
                output += `${teams[i][j]}\n`
            }
            output += '\n'
        }

        return output
    }
}