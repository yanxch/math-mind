import { GameState, PlayerState } from '../state';
import { JoinCode } from './JoinCode';

export class Game {
    private gameCode: string;
    private players: PlayerState[];

    private constructor({ gameCode, players }: GameState) {
        this.gameCode = gameCode;
        this.players = players;
    }

    static fromGameCode(gameCode: string) {
        return new Game({ gameCode, players: [] });
    }

    static fromState(state: GameState) {
        return new Game(state);
    }

    asState(): GameState {
        return {
            gameCode: this.gameCode,
            players: this.players,
        };
    }

    addNewPlayer(joinCode: JoinCode) {
        // this.players.find(p => p.joinState.)

        this.players.push({
            joinState: joinCode.asState(),
            status: 'CONNECTED',
        });
    }
}
