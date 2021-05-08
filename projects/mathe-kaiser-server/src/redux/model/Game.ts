import { CalculationState, GameState, GameStatus, PlayerState } from '../state';
import { AnswerState } from './Answer';
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
        const { username } = join.asState();

        const isUsernameAlreadyTaken = this.players.some(p => p.joinState.username === username);
        if (isUsernameAlreadyTaken) {
            throw new Error('USERNAME_ALREADY_TAKEN: ' + username);
        }

        this.players.push({
            joinState: join.asState(),
            playerGameState: {
                points: 0,
                events: []
            },
            status: 'CONNECTED',
        });
    }

    getJoinCodes() {
        return this.players.map((player) => player.joinState.joinCode);
    }

    getPlayersCount() {
        return this.players.length;
    }

    getPlayerByUsername(username: string) {
        const player = this.players.find(p => p.joinState.username === username);
        if (!player) {
            throw new Error(`Could not find player with username: ${username}, 
                game: ${this.gameCode}`)
        }

        return player;
    }

    isNewGame() {
        return this.status === 'NEW';
    }

    startGame(task: Task) {
        this.status = 'STARTED';
        this.task = task.asState();
    }

    newTask(task: Task) {
        this.task = task.asState();
    }

    currentTask() {
        if (this.task) {
            return this.task;
        }
        throw new Error(`This is not your fault. We are sorry. 
            Task is not set when it should be!`);
    }

    isCorrectAnswer(answer: AnswerState) {
        if (this.task) {
            return new Calculation(this.task as CalculationState)
                .isCorrect(answer as CalculationState);
        }

        return false;
    }
}
