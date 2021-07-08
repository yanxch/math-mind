import { configureStore, createSlice, Slice } from '@reduxjs/toolkit';
import {
    createGameLogic,
    joinedLogic,
    startGameLogic,
    CalculationTaskFactory,
    answerLogic,
    State,
} from '@server/math-mind';
import { WebsocketService } from '../app/websocket/websocket.service';
import { WebsocketMiddleware } from './middleware/wsMiddleware';
import { hydrateLogic } from './reducers/hydrateLogic';

const websocketService = new WebsocketService();
const websocketMiddleware = new WebsocketMiddleware(websocketService);

const storeSlice: Slice<State> = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        doNothing: (state, action) => state,
        hydrate: hydrateLogic,
        createGame: createGameLogic,
        joined: joinedLogic(new CalculationTaskFactory()),
        startGame: startGameLogic,
        answer: answerLogic(new CalculationTaskFactory()),
    },
});

export const { reducer, actions } = storeSlice;
export const { createGame, joined, startGame, answer, hydrate, doNothing } = actions;
export const store = configureStore({
    reducer,
    middleware: [websocketMiddleware.fn],
});

store.subscribe(() => {
    console.log('STATE CHANGED:', store.getState());
    localStorage.setItem('math-mind-state', JSON.stringify(store.getState()));
});
