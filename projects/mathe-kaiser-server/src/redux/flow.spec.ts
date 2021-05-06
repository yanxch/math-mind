import { configureStore } from '@reduxjs/toolkit';
import { expect } from 'chai';
import sinon from 'sinon';
import { answer, joined, reducer } from '.';
import { Calculation } from './model/Calculation';



let sandbox: any;

describe('Game', () => {
    let store: any;

    beforeEach(() => {
        // setup redux
        store = configureStore({
            reducer
        });
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

    it('2 players join and play two rounds', () => {
        // Given
        const joinPlayer1 = joined({ joinCode: 'mygamecode-hase1' });
        const joinPlayer2 = joined({ joinCode: 'mygamecode-hase2' });
        const answerPlayer1 = answer({
            username: 'hase1',
            gameCode: 'mygamecode',
            answer: {
                operator: '*',
                calculation: [0.5, '*', 7],
                result: 3.5,
            }
        });
        // When
        store.dispatch(joinPlayer1);
        store.dispatch(joinPlayer2);
        store.dispatch(answerPlayer1);


    })
});

function stubCalculation() {
    sandbox.stub(Calculation, 'newCalculationState').returns({
        operator: '*',
        calculation: [0.5, '*', 7],
        result: 3.5,
    });
}
