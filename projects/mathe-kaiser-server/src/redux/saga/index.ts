import { PayloadAction } from '@reduxjs/toolkit';
import { fork, select, takeEvery } from 'redux-saga/effects';
import { joined, sendCaluclation } from '..';
import { asJson } from '../../utils/ws-util';
import { Game } from '../model/Game';
import { Join } from '../model/Join';
import { JoinedAction } from '../reducer/Join';
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

function* sendCalcuationEffect(
    action: PayloadAction<JoinedAction>
) {
    const join = Join.fromString(action.payload.joinCode);
    const gameCode = join.getGameCode();

    const gameState: GameState = yield select(selectGame(gameCode));
    const game = Game.fromState(gameState);

    game.getJoinCodes().forEach((joinCode) => {
        const ws = connections[joinCode];
        ws.send(asJson(sendCaluclation({ gameState })));
    });
}

export function* pureLogicSaga() {
}

export function* joinedSaga() {
    yield takeEvery(joined.type, saveConnectionEffect);
    yield takeEvery(joined.type, sendCalcuationEffect);
}

export function* gameStartedSaga() {
    // yield takeEvery(sendCaluclation.type, sendCalcuationEffect);
}


export function* rootSaga() {
    yield fork(pureLogicSaga);
    yield fork(joinedSaga);
    yield fork(gameStartedSaga);
    // code after fork-effect
}