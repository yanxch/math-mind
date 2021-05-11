import { expect } from 'chai';
import { joined } from '..';
import { Calculation } from '../model/Calculation';
import { Task, TaskFactory } from '../model/Task';
import { State } from '../state';
import { joinedLogic } from './Join';

class StubbedCalculationTaskFactory implements TaskFactory {
    newTask(): Task {
        return new Calculation({
            operator: '*',
            calculation: [],
            result: 3,
        })
    }

}

describe('JoinReducerSpec', () => {
    it('join new game', () => {
        // Given
        const state: State = {
            games: {},
        };
        const action = joined({ joinCode: 'mygamecode-hase' });
        // When
        joinedLogic(new StubbedCalculationTaskFactory())(state, action);
        // Then
        expect(state).not.null;
        expect(state).to.deep.equal({
            games: {
                mygamecode: {
                    gameCode: 'mygamecode',
                    players: [
                        {
                            joinState: {
                                joinCode: 'mygamecode-hase',
                                username: 'hase',
                                gameCode: 'mygamecode',
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
                        calculation: [],
                        operator: '*',
                        result: 3,
                    },
                },
            },
        });
    });
});
