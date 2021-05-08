import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { joinedLogic } from './reducer/Join';
import { rootSaga } from './saga';
import { startGameLogic } from './reducer/StartGame';
import { sendCalculationLogic } from './reducer/SendCalculation';
import { createGameLogic } from './reducer/CreateGame';
import { answerLogic } from './reducer/AnswerLogic';
import { Calculation } from './model/Calculation';

const sagaMiddleware = createSagaMiddleware();

const storeSlice = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        createGame: createGameLogic,
        joined: joinedLogic,
        startGame: startGameLogic,
        answer: answerLogic({
            newTask() {
                return new Calculation();
            }
        }),
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
