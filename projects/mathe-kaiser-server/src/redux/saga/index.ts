import { PayloadAction } from '@reduxjs/toolkit';
import { select, takeEvery, put } from 'redux-saga/effects';
import { joined, ready } from '..';
import { Game } from '../model/Game';
import { JoinCode } from '../model/JoinCode';
import { JoinedAction } from '../reducer/Join';
import { GameState, State } from '../state';
import { connections } from './connections';

export const selectGame = (gameCode: string) => (state: State) => state.games[gameCode];

function* saveWebsocketConnection(action: PayloadAction<JoinedAction>) {
   console.log('Saved the WS connection..', action);
   const {joinCode, username, connection} = action.payload;
   if (connection) {
      connections[joinCode] = connection;
   }

   // get all connections from game. via joincodes
   const code = JoinCode.fromString(joinCode, username);
   const gameCode = code.getGameCode();

   const gameState: GameState =  yield select(selectGame(gameCode));
   const game = Game.fromState(gameState);
   const joinCodes = game.getJoinCodes();
   if (joinCodes.length > 1) {
      yield put(ready)
   } else {

   }
   // joinCodes.forEach(c => {
   //   const ws = connections[c];
   //   ws.send(JSON.stringify({}));
   // });
   // if only one ... message: wait for other players ==> ws.WaitForOthersToJoin
   // if more than one ... ready to play ==> ws.Calculation
}

export function* mySaga() {
   yield takeEvery(joined.type, saveWebsocketConnection);
}
