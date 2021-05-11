import { configureStore, createSlice } from '@reduxjs/toolkit';
import { expect } from 'chai';
import { answer, joined, reducer } from '.';
import { Calculation } from './model/Calculation';
import { Task, TaskFactory } from './model/Task';
import { answerLogic } from './reducer/AnswerLogic';
import { createGameLogic } from './reducer/CreateGame';
import { joinedLogic } from './reducer/Join';
import { sendCalculationLogic } from './reducer/SendCalculation';
import { startGameLogic } from './reducer/StartGame';

class StubbedCalculationTaskFactory implements TaskFactory {
    newTask(): Task {
        return new Calculation({
            operator: '*',
            calculation: [3, "*", 3],
            result: 9,
        })
    }

}

const storeSlice = createSlice({
    name: 'games',
    initialState: { games: {} },
    reducers: {
        createGame: createGameLogic,
        joined: joinedLogic(new StubbedCalculationTaskFactory()),
        startGame: startGameLogic,
        answer: answerLogic(new StubbedCalculationTaskFactory()),
        sendCaluclation: sendCalculationLogic,
    },
});

describe('Game Flow', () => {
    let store: any;

    beforeEach(() => {
        // setup redux
        store = configureStore({
            reducer: storeSlice.reducer
        });
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
                        calculation: [3, '*', 3],
                        result: 9,
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
