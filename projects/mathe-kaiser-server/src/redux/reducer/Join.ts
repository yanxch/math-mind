import { Game } from '../model/Game';
import { JoinCode } from '../model/JoinCode';
import { State } from '../state';
import ws from 'ws';

export function joinReducer(
    state: State,
    action: { payload: { joinCode: string; username: string; connection?: ws } }
) {
    console.log('Within JoinReducer...');
    const joinCode = JoinCode.fromString(
        action.payload.joinCode,
        action.payload.username
    );
    const gameCode = joinCode.getGameCode();
    const gameState = state.games[gameCode];

    let game: Game;
    if (!gameState) {
        game = Game.fromGameCode(gameCode);
        game.addNewPlayer(joinCode);
    } else {
        game = Game.fromState(gameState);
        game.addNewPlayer(joinCode);
    }

    return {
        ...state,
        [gameCode]: game.asState(),
    };
}
