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
        const joinPlayer1 = joined({ joinCode: 'mygamecode-hase1' });
        const joinPlayer2 = joined({ joinCode: 'mygamecode-hase2' });
        // When
        store.dispatch(joinPlayer1);
        store.dispatch(joinPlayer2);
        // Then
        console.log('Have fun');
        console.log(JSON.stringify(store.getState(), null, 4));
        expect(store.getState()).not.null;
    });
});