import { createGame } from '..';
import { State } from '../state';
import { createGameLogic } from './CreateGame';
import { expect } from 'chai';
import { Game } from '../model/Game';

describe('CreateGameLogic', () => {
    it('create new game', () => {
        // Given
        const state: State = {
            games: {},
        };
        const gameCode = Game.newGameCode();
        const action = createGame({ gameCode , username: 'hase' });
        // When
        const newState = createGameLogic(state, action);
        // Then
        expect(newState).not.null;
        expect(newState).to.deep.equal({
            games: {
                [gameCode]: {},
            },
        });
    });
});
