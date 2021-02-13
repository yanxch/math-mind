import { PayloadAction } from '@reduxjs/toolkit';
import { select, takeEvery, put } from 'redux-saga/effects';
import { joined, ready, waiting } from '..';
import { Game } from '../model/Game';
import { JoinCode } from '../model/JoinCode';
import { JoinedAction } from '../reducer/Join';
import { GameState, State } from '../state';
import { connections } from './connections';

export const selectGame = (gameCode: string) => (state: State) =>
    state.games[gameCode];

function* saveWebsocketConnection(action: PayloadAction<JoinedAction>) {
    console.log('Saved the WS connection..', action);
    const { joinCode, connection } = action.payload;
    if (connection) {
        connections[joinCode] = connection;
    }
}

function* informOthers(action: PayloadAction<JoinedAction>) {
    const { joinCode, username } = action.payload;

    const code = JoinCode.fromString(joinCode, username);
    const gameCode = code.getGameCode();

    const gameState: GameState = yield select(selectGame(gameCode));
    const game = Game.fromState(gameState);

    if (game.getPlayersCount() > 1) {
        yield put(ready({ gameState }));
    } else {
        yield put(waiting({ gameState }));
    }
}

export function* joinedSaga() {
    yield takeEvery(joined.type, saveWebsocketConnection);
    yield takeEvery(joined.type, informOthers);
}
