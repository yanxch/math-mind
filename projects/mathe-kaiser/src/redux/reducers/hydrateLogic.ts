import { PayloadAction } from '@reduxjs/toolkit';
import { State } from '@server/math-mind';

export type HydrateAction = {
    state: State;
};
export const hydrateLogic = (state: State, action: PayloadAction<HydrateAction>) => {
    const { state: newState } = action.payload;
    return newState;
}