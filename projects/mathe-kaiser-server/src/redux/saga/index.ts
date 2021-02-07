import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';
import { joined } from '..';
import { JoinedAction } from '../reducer/Join';
import { connections } from './connections';

function* saveWebsocketConnection(action: PayloadAction<JoinedAction>) {
   console.log('Saved the WS connection..', action);
   if (action.payload.connection) {
      const joinCode = action.payload.joinCode;
      connections[joinCode] = action.payload.connection;
   }
}

export function* mySaga() {
   yield takeEvery(joined.type, saveWebsocketConnection);
}
