import { PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../model/Game';
import { Join } from '../model/Join';
import { GameState, JoinState, State } from '../state';

export type SendCalculationAction = { gameState: GameState, joinState: JoinState };

export function sendCalculationLogic(
    state: State,
    action: PayloadAction<SendCalculationAction>
) {

    const game = Game.fromState(action.payload.gameState);
    const join = Join.fromState(action.payload.joinState);


    
    return state;
}
