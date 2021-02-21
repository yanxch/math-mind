import { Calculation } from "./model/Calculation";

export type Games = {
    [gameCode: string]: GameState
}

export interface State {
    games: Games;
}

export interface GameState {
    gameCode: string;
    players: PlayerState[];
    status: GameStatus;
    calculation?: Calculation;
}

export interface CalculationState {
    operator: string;
    calculation: any[];
    result: number;
}

export type GameStatus = 'NEW' | 'WAITING' | 'STARTED';

export type PlayerStatus = 'CONNECTED' | 'NOT_YET_CONNECTED' | 'CLOSED';

export interface PlayerState {
    joinState: JoinState;
    status: PlayerStatus;
}

export interface JoinState {
    joinCode: string;
    username: string;
    gameCode: string;
    playerNumber: string;
}
