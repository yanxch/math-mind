import { CalculationState, GameState, GameStatus, PlayerState } from '../state';
import { Calculation } from './Calculation';
import { createGameCode } from './GameCode';
import { Join } from './Join';

export class Game {
    private gameCode: string;
    private players: PlayerState[];
    private status: GameStatus;
    private calculation?: CalculationState;

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

    static newGameCode() {
        return createGameCode(6);
    }

    asState(): GameState {
        return {
            gameCode: this.gameCode,
            players: this.players,
            status: this.status,
            calculation: this.calculation,
        };
    }

    addNewPlayer(joinCode: Join) {
        // this.players.find(p => p.joinState.)

        this.players.push({
            joinState: joinCode.asState(),
            status: 'CONNECTED',
            username: '' // TODO
        });
    }

    getJoinCodes() {
        return this.players.map((player) => player.joinState.joinCode);
    }

    getPlayersCount() {
        return this.players.length;
    }

    isNewGame() {
        // first player joined means that we have a new game that started
        return this.status !== 'STARTED' && this.players.length === 1;
    }

    startGame() {
        this.status = 'STARTED';
        this.calculation = Calculation.newCalculation().asState();
    }

    currentCalculation() {
        if (this.calculation) {
            return this.calculation;
        }
        throw new Error(`This is not your fault. We are sorry. 
            Calculation is not set when it should be!`);
    }
}
