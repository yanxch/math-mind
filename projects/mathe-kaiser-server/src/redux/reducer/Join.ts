import { Game } from '../model/Game';
import { Join } from '../model/Join';
import { State } from '../state';
import ws from 'ws';
import { PayloadAction } from '@reduxjs/toolkit';

export type JoinedAction = {
    joinCode: string;
    username: string;
    connection?: ws;
};

export function joinedLogic(state: State, action: PayloadAction<JoinedAction>) {
    console.log('Within JoinReducer...');
    const joinCode = Join.fromString(
        action.payload.joinCode,
        action.payload.username
    );
    const gameCode = joinCode.getGameCode();
    const gameState = state.games[gameCode];

    let game: Game;
    if (!gameState) {
        game = Game.fromGameCode(gameCode);
        game.addNewPlayer(joinCode);
    } else {
        game = Game.fromState(gameState);
        game.addNewPlayer(joinCode);
    }

    return {
        ...state,
        games: {
            [gameCode]: game.asState(),
        },
    };
}
