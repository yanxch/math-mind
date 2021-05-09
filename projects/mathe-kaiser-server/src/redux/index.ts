import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { CalculationTaskFactory } from './model/Calculation';
import { answerLogic } from './reducer/AnswerLogic';
import { createGameLogic } from './reducer/CreateGame';
import { joinedLogic } from './reducer/Join';
import { sendCalculationLogic } from './reducer/SendCalculation';
import { startGameLogic } from './reducer/StartGame';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

const storeSlice = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        createGame: createGameLogic,
        joined: joinedLogic,
        startGame: startGameLogic,
        answer: answerLogic(new CalculationTaskFactory()),
        sendCaluclation: sendCalculationLogic,
    },
});

export const { reducer, actions } = storeSlice;
export const { createGame, joined, startGame, sendCaluclation, answer } = actions;
export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => console.log('STATE CHANGED:', store.getState()));
