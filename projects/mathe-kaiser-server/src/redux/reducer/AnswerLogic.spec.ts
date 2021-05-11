import { expect } from 'chai';
import { answer } from "..";
import { Calculation, CalculationTaskFactory } from "../model/Calculation";
import { State } from "../state";
import { answerLogic } from "./AnswerLogic";

describe('AnswerLogic', () => {
    it('answer correct', () => {
        // Given
        const state: State = {
            games: {
                mygamecode: {
                    gameCode: 'mygamecode',
                    players: [{
                        joinState: {
                            joinCode: 'mygamecode-hase1',
                            gameCode: 'mygamecode',
                            username: 'hase1',
                        },
                        status: 'CONNECTED',
                        playerGameState: {
                            points: 0
                        }
                    }],
                    status: 'STARTED',
                    task: {
                        operator: '*',
                        calculation: [0.5, '*', 7],
                        result: 3.5,
                        type: Calculation
                    },
                }
            }
        };
        // When
        const answerAction = answer({
            username: 'hase1',
            gameCode: 'mygamecode',
            answer: {
                result: 3.5
            }
        })
        answerLogic(new CalculationTaskFactory())(state, answerAction);
        // Then
        expect(state.games['mygamecode'].players[0].playerGameState.points).to.equal(10);
    });

    it('answer incorrect', () => {
        // Given
        const state: State = {
            games: {
                mygamecode: {
                    gameCode: 'mygamecode',
                    players: [{
                        joinState: {
                            joinCode: 'mygamecode-hase1',
                            gameCode: 'mygamecode',
                            username: 'hase1',
                        },
                        status: 'CONNECTED',
                        playerGameState: {
                            points: 0
                        }
                    }],
                    status: 'STARTED',
                    task: {
                        operator: '*',
                        calculation: [0.5, '*', 7],
                        result: 3.5,
                        type: Calculation
                    },
                }
            }
        };
        // When
        const answerAction = answer({
            username: 'hase1',
            gameCode: 'mygamecode',
            answer: {
                result: 3
            }
        })
        answerLogic(new CalculationTaskFactory())(state, answerAction);
        // Then
        expect(state.games['mygamecode'].players[0].playerGameState.points).to.equal(0);
    });

});
