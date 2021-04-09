import { joined } from '..';
import { State } from '../state';
import { joinedLogic } from './Join';
import { expect } from 'chai';
import { Calculation } from '../model/Calculation';
import * as sinon  from 'sinon';

describe('JoinReducerSpec', () => {
    it('join new game', () => {
        // Stub
        stubCalculation();
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

function stubCalculation() {
    sinon.stub(Calculation, 'newCalculation').returns(Calculation.fromState({
        operator: '*',
        calculation: [],
        result: 3
    }));
}
