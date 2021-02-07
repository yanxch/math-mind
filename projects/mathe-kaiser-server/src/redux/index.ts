import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { joinReducer } from './reducer/Join';
import { mySaga } from './saga';
import { State } from './state';

const sagaMiddleware = createSagaMiddleware();

const counterSlice = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        join: joinReducer,
        ready,
    },
});

const { reducer, actions } = counterSlice;
export const { join } = actions;

export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(mySaga);

store.subscribe(() => console.log('STATE CHANGED:', store.getState()));

/*store.dispatch(
    actions.join({
        joinCode: 'ae3rgd-1',
        username: 'janksi',
        connection: undefined,
    })
);*/

function ready(state: State, action: any) {
    return state;
}
