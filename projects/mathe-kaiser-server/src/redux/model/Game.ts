import { GameState, GameStatus, PlayerState } from '../state';
import { Calculation } from './Calculation';
import { Join } from './Join';

export class Game {
    private gameCode: string;
    private players: PlayerState[];
    private status: GameStatus;
    private calculation?: Calculation;

    private constructor({ gameCode, players, status, calculation }: GameState) {
        this.gameCode = gameCode;
        this.players = players;
        this.status = status;
        this.calculation = calculation;
    }

    static fromGameCode(gameCode: string) {
        return new Game({ gameCode, players: [], status: 'NEW' });
    }

    static fromState(state: GameState) {
        return new Game(state);
    }

    asState(): GameState {
        return {
            gameCode: this.gameCode,
            players: this.players,
            status: this.status,
            calculation: this.calculation
        };
    }

    addNewPlayer(joinCode: Join) {
        // this.players.find(p => p.joinState.)

        this.players.push({
            joinState: joinCode.asState(),
            status: 'CONNECTED',
        });
    }

    getJoinCodes() {
        return this.players.map((player) => player.joinState.joinCode);
    }

    getPlayersCount() {
        return this.players.length;
    }

    isNewGame() {
        return this.status !== 'STARTED' && this.players.length === 1;
    }

    startGame() {
        this.status = 'STARTED';
        this.calculation = Calculation.newCalculation();
    }
}
