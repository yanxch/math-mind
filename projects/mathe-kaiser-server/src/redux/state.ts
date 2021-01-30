export type GameMap = {
    [gameId: string]: Game
}

export interface State {
    games: GameMap;
}

export interface Game {
    players: Player[];
}

export interface Player {
    name: string;
    connectionKey: string;
    status: 'CONNECTED' | 'NOT_YET_CONNECTED' | 'CLOSED'
}
