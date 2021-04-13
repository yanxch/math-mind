import { CalculationState, GameState, GameStatus, PlayerState } from '../state';
import { Calculation } from './Calculation';
import { createGameCode } from './GameCode';
import { Join } from './Join';
import { Task, TaskState } from './Task';

export class Game {
    private gameCode: string;
    private players: PlayerState[];
    private status: GameStatus;
    private task?: TaskState;

    private constructor({ gameCode, players, status, task }: GameState) {
        this.gameCode = gameCode;
        this.players = players;
        this.status = status;
        this.task = task;
    }

    static fromGameCode(gameCode: string) {
        return new Game({ gameCode, players: [], status: 'NEW', task: undefined });
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
            task: this.task,
        };
    }

    addNewPlayer(join: Join) {
        const {username} = join.asState();
        
        const isUsernameAlreadyTaken = this.players.some(p => p.joinState.username === username);
        if (isUsernameAlreadyTaken) {
            throw new Error('USERNAME_ALREADY_TAKEN');
        }

        this.players.push({
            joinState: join.asState(),
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
        return this.status === 'NEW';
    }

    startGame(task: Task) {
        this.status = 'STARTED';
        this.task = task.asState();
    }

    currentTask() {
        if (this.task) {
            return this.task;
        }
        throw new Error(`This is not your fault. We are sorry. 
            Calculation is not set when it should be!`);
    }
}
