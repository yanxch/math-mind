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
        const action = joined({ joinCode: 'mygamecode-hase' });
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
                                joinCode: 'mygamecode-hase',
                                username: 'hase',
                                gameCode: 'mygamecode'
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