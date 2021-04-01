import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { joined, reducer } from ".";
import { pureLogicSaga } from "./saga";
import { expect } from 'chai';


const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(pureLogicSaga);

describe('Game', () => {

    it ('2 players', () => {
        // Given
        const joinPlayer1 = joined({ joinCode: 'mygamecode-1', username: 'hase' });
        const joinPlayer2 = joined({ joinCode: 'mygamecode-2', username: 'hase' });
        // When
        store.dispatch(joinPlayer1);
        store.dispatch(joinPlayer2);
        // Then
        console.log('Have fun');
        expect(store.getState()).not.null;
    });
});