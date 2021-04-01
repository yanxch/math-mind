import { joined } from '..';
import { State } from '../state';
import { joinedLogic } from './Join';
import { expect } from 'chai';

describe('JoinReducerSpec', () => {
    it('join new game', () => {
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
                    status: 'NEW',
                    calculation: undefined,
                },
            },
        });
    });
});
