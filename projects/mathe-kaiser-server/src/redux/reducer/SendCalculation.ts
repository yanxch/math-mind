import { PayloadAction } from '@reduxjs/toolkit';
import { GameState, State } from '../state';

export type SendCalculationAction = { gameState: GameState };

// Sending calculation to players
// currently only used for saga
export function sendCalculationLogic(
    state: State,
    action: PayloadAction<SendCalculationAction>
) {
    return state;
}
