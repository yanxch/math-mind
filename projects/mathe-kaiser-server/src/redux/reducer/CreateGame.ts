import { PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../model/Game';
import { State } from '../state';

export type CreateGameAction = { username: string };

export function createGameLogic(
    state: State,
    action: PayloadAction<CreateGameAction>
) {
    const gameCode = Game.newGameCode();
    const game = Game.fromGameCode(gameCode);

    return {
        ...state,
        games: {
            [gameCode]: game.asState()
        }
    };
}
