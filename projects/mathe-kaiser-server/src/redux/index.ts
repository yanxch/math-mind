import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { joinedLogic } from './reducer/Join';
import { joinedSaga } from './saga';
import { startGameLogic } from './reducer/StartGame';
import { sendCalculationLogic } from './reducer/SendCalculation';
import { createGameLogic } from './reducer/CreateGame';

const sagaMiddleware = createSagaMiddleware();

const counterSlice = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        createGame: createGameLogic,
        joined: joinedLogic,
        startGame: startGameLogic,
        sendCaluclation: sendCalculationLogic,
    },
});

const { reducer, actions } = counterSlice;
export const { createGame, joined, startGame, sendCaluclation } = actions;

export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(joinedSaga);

store.subscribe(() => console.log('STATE CHANGED:', store.getState()));
