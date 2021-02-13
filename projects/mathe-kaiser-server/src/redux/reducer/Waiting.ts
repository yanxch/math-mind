import { PayloadAction } from '@reduxjs/toolkit';
import { GameState, State } from '../state';

export type WaitingForOthersLogic = { gameState: GameState };

export function waitingForOthersLogic(
    state: State,
    action: PayloadAction<WaitingForOthersLogic>
) {
    return state;
}
