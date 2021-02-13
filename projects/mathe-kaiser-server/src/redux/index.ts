import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { joinedLogic } from './reducer/Join';
import { mySaga } from './saga';
import { readyLogic } from './reducer/Ready';
const sagaMiddleware = createSagaMiddleware();

const counterSlice = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        joined: joinedLogic,
        ready: readyLogic,
    },
});

const { reducer, actions } = counterSlice;
export const { joined, ready } = actions;

export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(mySaga);

store.subscribe(() => console.log('STATE CHANGED:', store.getState()));
