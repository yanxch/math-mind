import { joined } from '..';
import { State } from '../state';
import { joinedLogic } from './Join';
import { expect } from 'chai';
import { Calculation } from '../model/Calculation';
import * as sinon  from 'sinon';

describe('JoinReducerSpec', () => {
    it('join new game', () => {
        sinon.stub(Calculation, 'newCalculation').returns(Calculation.fromState({
                operator: '*',
                calculation: [],
                result: 3
            }));
        // Given
        const state: State = {
            games: {},
        };
        const action = joined({ joinCode: 'mygamecode-123', username: 'hase' });
        // When
        joinedLogic(state, action);
        // Then
        expect(state).not.null;
        expect(state).to.deep.equal({
            games: {
                mygamecode: {
                    gameCode: 'mygamecode',
                    players: [
                        {
                            joinState: {
                                joinCode: 'mygamecode-123',
                                username: 'hase',
                                gameCode: 'mygamecode',
                                playerNumber: '123',
                            },
                            status: 'CONNECTED'
                        },
                    ],
                    status: 'STARTED',
                    calculation: {
                        calculation: [],
                        operator: '*',
                        result: 3
                    },
                },
            },
        });
    });
});
// TODO javascript fakes how 