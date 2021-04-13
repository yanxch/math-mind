import { Game } from '../model/Game';
import { Join } from '../model/Join';
import { State } from '../state';
import ws from 'ws';
import { PayloadAction } from '@reduxjs/toolkit';
import { Calculation } from '../model/Calculation';

export type JoinedAction = {
    joinCode: string;
    connection?: ws;
};

export function joinedLogic(state: State, action: PayloadAction<JoinedAction>) {
    const joinCode = Join.fromString(
        action.payload.joinCode
    );
    const gameCode = joinCode.getGameCode();
    const gameState = state.games[gameCode];

    let game = gameState
        ? Game.fromState(gameState)
        : Game.fromGameCode(gameCode);

    game.addNewPlayer(joinCode);

    if (game.isNewGame()) {
        game.startGame(new Calculation());
    }

    state.games[gameCode] = game.asState();
}
