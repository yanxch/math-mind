import { PayloadAction } from '@reduxjs/toolkit';
import { Calculation } from '../model/Calculation';
import { Game } from '../model/Game';
import { GameState, State } from '../state';

export type StartGameAction = { gameState: GameState };

export function startGameLogic(
    state: State,
    action: PayloadAction<StartGameAction>
): State {
    const gameCode = action.payload.gameState.gameCode;
    const game = Game.fromState(action.payload.gameState);
    game.startGame(new Calculation());

    return {
        ...state,
        [gameCode]: game.asState(),
    };
}
