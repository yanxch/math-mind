import { joined } from '..';
import { State } from '../state';
import { joinedLogic } from './Join';
import { expect } from 'chai';
import { Calculation } from '../model/Calculation';
import * as sinon from 'sinon';

let sandbox: any;

describe('JoinReducerSpec', () => {
    beforeEach(() => {
        // Stub
        sandbox = sinon.createSandbox();
        stubCalculation();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('join new game', () => {
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
                                gameCode: 'mygamecode',
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

function stubCalculation() {
    sandbox.stub(Calculation, 'newCalculationState').returns({
        operator: '*',
        calculation: [],
        result: 3,
    });
}
