import { PayloadAction } from '@reduxjs/toolkit';
import * as ws from 'ws';
import { Game } from '../model/Game';
import { Join } from '../model/Join';
import { TaskFactory } from '../model/Task';
import { State } from '../state';

export type JoinedAction = {
    joinCode: string;
    connection?: ws;
};

export function joinedLogic(taskFactory: TaskFactory) {
    return (state: State, action: PayloadAction<JoinedAction>) => {
        const joinCode = Join.fromString(action.payload.joinCode);
        const gameCode = joinCode.getGameCode();
        const username = joinCode.getUsername();
        const gameState = state.games[gameCode];

        let game = gameState
            ? Game.fromState(gameState)
            : Game.fromGameCode(gameCode); // this is a new game? right?

        if (!game.hasAlreadyJoined(username)) {
            game.addNewPlayer(joinCode);

            if (game.isNewGame()) {
                game.startGame(taskFactory.newTask());
            }
        }

        state.games[gameCode] = game.asState();
    };
}
