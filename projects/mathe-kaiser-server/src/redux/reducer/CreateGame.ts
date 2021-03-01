import { PayloadAction } from '@reduxjs/toolkit';
import { State } from '../state';

export type CreateGameAction = { username: string };

export function createGameLogic(
    state: State,
    action: PayloadAction<CreateGameAction>
) {


    return {
        ...state,
    };
}
