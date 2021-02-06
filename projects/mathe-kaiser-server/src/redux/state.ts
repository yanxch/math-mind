export type Games = {
    [gameCode: string]: GameState
}

export interface State {
    games: Games;
}

export interface GameState {
    gameCode: string;
    players: PlayerState[];
}

export type PlayerStatus = 'CONNECTED' | 'NOT_YET_CONNECTED' | 'CLOSED';

export interface PlayerState {
    joinState: JoinState;
    status: PlayerStatus;
}

export interface JoinState {
    value: string;
    username: string;
    gameCode: string;
    playerNumber: string;
}
