import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
    createGameLogic,
    joinedLogic,
    startGameLogic,
    CalculationTaskFactory,
    answerLogic,
} from '@server/math-mind';

const storeSlice = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        hydrate: (state: any, action: any) => {
            return action.payload;
        },
        createGame: createGameLogic,
        joined: joinedLogic(new CalculationTaskFactory()),
        startGame: startGameLogic,
        answer: answerLogic(new CalculationTaskFactory()),
    },
});

export const { reducer, actions } = storeSlice;
export const { createGame, joined, startGame, answer, hydrate } = actions;
export const store = configureStore({
    reducer,
    middleware: [],
});

store.subscribe(() => {
    console.log('STATE CHANGED:', store.getState());
    localStorage.setItem('math-mind-state', JSON.stringify(store.getState()));
});
