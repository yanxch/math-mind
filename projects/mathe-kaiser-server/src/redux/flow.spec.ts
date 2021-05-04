import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { joined, reducer } from '.';
import { pureLogicSaga } from './saga';
import { expect } from 'chai';
import sinon from 'sinon';
import { Calculation } from './model/Calculation';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(pureLogicSaga);

let sandbox: any;

describe('Game', () => {
    beforeEach(() => {
        // Stub
        sandbox = sinon.createSandbox();
        stubCalculation();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('2 players join', () => {
        // Given
        const joinPlayer1 = joined({ joinCode: 'mygamecode-hase1' });
        const joinPlayer2 = joined({ joinCode: 'mygamecode-hase2' });
        // When
        store.dispatch(joinPlayer1);
        store.dispatch(joinPlayer2);
        // Then
        console.log(JSON.stringify(store.getState(), null, 4));
        expect(store.getState()).not.null;
        expect(store.getState()).to.deep.equal({
            games: {
                mygamecode: {
                    gameCode: 'mygamecode',
                    players: [
                        {
                            joinState: {
                                joinCode: 'mygamecode-hase1',
                                gameCode: 'mygamecode',
                                username: 'hase1',
                            },
                            playerGameState: {
                                points: 0,
                                events: []
                            },
                            status: 'CONNECTED',
                        },
                        {
                            joinState: {
                                joinCode: 'mygamecode-hase2',
                                gameCode: 'mygamecode',
                                username: 'hase2',
                            },
                            playerGameState: {
                                points: 0,
                                events: []
                            },
                            status: 'CONNECTED',
                        },
                    ],
                    status: 'STARTED',
                    task: {
                        operator: '*',
                        calculation: [0.5, '*', 7],
                        result: 3.5,
                    },
                },
            },
        });
    });
});

function stubCalculation() {
    sandbox.stub(Calculation, 'newCalculationState').returns({
        operator: '*',
        calculation: [0.5, '*', 7],
        result: 3.5,
    });
}
