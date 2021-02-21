import { PayloadAction } from '@reduxjs/toolkit';
import { select, takeEvery, put } from 'redux-saga/effects';
import { joined, startGame, waiting } from '..';
import { Game } from '../model/Game';
import { Join } from '../model/Join';
import { JoinedAction } from '../reducer/Join';
import { StartGameAction } from '../reducer/StartGame';
import { GameState, State } from '../state';
import { connections } from './connections';

export const selectGame = (gameCode: string) => (state: State) =>
    state.games[gameCode];

function* saveConnectionEffect(action: PayloadAction<JoinedAction>) {
    const { joinCode, connection } = action.payload;
    if (connection) {
        connections[joinCode] = connection;
    }
}

function* startGameEffect(action: PayloadAction<JoinedAction>) {
    const { joinCode, username } = action.payload;

    const code = Join.fromString(joinCode, username);
    const gameCode = code.getGameCode();

    const gameState: GameState = yield select(selectGame(gameCode));
    const game = Game.fromState(gameState);

    if (game.isNewGame()) {
        yield put(startGame({ gameState }));
    } 
    else {
        // TODO
    }

}

function* sendCalcuation(action: PayloadAction<StartGameAction>) {
    const gameState = action.payload.gameState;
    const game = Game.fromState(gameState);

    // TODO
}

export function* joinedSaga() {
    yield takeEvery(joined.type, saveConnectionEffect);
    yield takeEvery(joined.type, startGameEffect);
}

export function* gameStartedSaga() {
    yield takeEvery(startGame.type, sendCalcuation);
}
