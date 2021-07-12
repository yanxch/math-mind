import { PayloadAction } from '@reduxjs/toolkit';
import { fork, select, takeEvery } from 'redux-saga/effects';
import { answer, joined, sendCaluclation } from '..';
import { asJson } from '../../utils/ws-util';
import { Game } from '../model/Game';
import { Join } from '../model/Join';
import { AnswerAction } from '../reducer/AnswerLogic';
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

function* sendState(
    action: PayloadAction<JoinedAction>
) {
    const join = Join.fromString(action.payload.joinCode);
    const gameCode = join.getGameCode();

    const gameState: GameState = yield select(selectGame(gameCode));
    const game = Game.fromState(gameState);

    game.getJoinCodes().forEach((joinCode) => {
        const ws = connections[joinCode];
        ws.send(asJson({ games: { [gameCode]: gameState } }));
    });
}

function* sendState2(action: PayloadAction<AnswerAction>) {
    const gameCode = action.payload.gameCode;
    const gameState: GameState = yield select(selectGame(gameCode));
    const game = Game.fromState(gameState);

    game.getJoinCodes().forEach((joinCode) => {
        const ws = connections[joinCode];
        ws.send(asJson({ games: { [gameCode]: gameState } }));
    });
}

export function* pureLogicSaga() {
}

export function* joinedSaga() {
    yield takeEvery(joined.type, saveConnectionEffect);
    yield takeEvery(joined.type, sendState);
}

export function* gameStartedSaga() {
    // yield takeEvery(sendCaluclation.type, sendCalcuationEffect);
    yield takeEvery(answer.type, sendState2);
}


export function* rootSaga() {
    yield fork(pureLogicSaga);
    yield fork(joinedSaga);
    yield fork(gameStartedSaga);
    // code after fork-effect
}