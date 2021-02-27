import { expect } from 'chai';
import { Game } from './Game';

describe('Game', () => {
    it('creates a readable but random game code', () => {
        // Given
        // When
        const gameCode = Game.newGameCode();
        // Then
        console.log('GAMECODE::', gameCode);
        expect(gameCode).not.null;
        expect(gameCode.length).to.eq(6);
    });
});
