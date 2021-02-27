import { joined } from '..';
import { State } from '../state';
import { joinedLogic } from './Join';
import { expect } from 'chai';

describe('JoinReducerSpec', () => {
    it('worx', () => {
        // Given
        const state: State = {
            games: {},
        };
        const action = joined({ joinCode: 'join-123', username: 'hase' });
        // When
        const newState = joinedLogic(state, action);
        // Then
        expect(newState).not.null;
    });
});
