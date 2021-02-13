import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { joinedLogic } from './reducer/Join';
import { joinedSaga } from './saga';
import { readyToPlayLogic } from './reducer/Ready';
import { waitingForOthersLogic } from './reducer/Waiting';

const sagaMiddleware = createSagaMiddleware();

const counterSlice = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        joined: joinedLogic,
        ready: readyToPlayLogic,
        waiting: waitingForOthersLogic,
    },
});

const { reducer, actions } = counterSlice;
export const { joined, ready, waiting } = actions;

export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(joinedSaga);

store.subscribe(() => console.log('STATE CHANGED:', store.getState()));
