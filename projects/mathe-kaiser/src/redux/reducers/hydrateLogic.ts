import { PayloadAction } from '@reduxjs/toolkit';
import { Games, State } from '@server/math-mind';

export type HydrateAction = {
    games: Games;
};
export const hydrateLogic = (state: State, action: PayloadAction<HydrateAction>) => {
    state.games = action.payload.games;
}