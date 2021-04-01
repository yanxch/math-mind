import { PayloadAction } from '@reduxjs/toolkit';
import { fork, put, select, takeEvery } from 'redux-saga/effects';
import { joined, sendCaluclation, startGame } from '..';
import { asJson } from '../../utils/ws-util';
import { Game } from '../model/Game';
import { Join } from '../model/Join';
import { JoinedAction } from '../reducer/Join';
import { SendCalculationAction } from '../reducer/SendCalculation';
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
    } else {
        yield put(sendCaluclation({ gameState }));
    }
}

function* sendCalcuationEffect(
    action:
        | PayloadAction<StartGameAction>
        | PayloadAction<SendCalculationAction>
) {
    const gameState = action.payload.gameState;
    const game = Game.fromState(gameState);

    game.getJoinCodes().forEach((joinCode) => {
        const ws = connections[joinCode];
        ws.send(asJson(sendCaluclation({ gameState })));
    });
}

export function* pureLogicSaga() {
    yield takeEvery(joined.type, startGameEffect);
}

export function* joinedSaga() {
    yield takeEvery(joined.type, saveConnectionEffect);
}

export function* gameStartedSaga() {
    yield takeEvery(startGame.type, sendCalcuationEffect);
    yield takeEvery(sendCaluclation.type, sendCalcuationEffect);
}


export function* rootSaga() {
    yield fork(pureLogicSaga);
    yield fork(joinedSaga);
    yield fork(gameStartedSaga);
    // code after fork-effect
  }