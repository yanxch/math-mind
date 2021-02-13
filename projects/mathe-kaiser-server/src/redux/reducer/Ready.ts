import { PayloadAction } from '@reduxjs/toolkit';
import { GameState, State } from '../state';

export type ReadyToPlayAction = { gameState: GameState };

export function readyToPlayLogic(
    state: State,
    action: PayloadAction<ReadyToPlayAction>
) {
    return state;
}
