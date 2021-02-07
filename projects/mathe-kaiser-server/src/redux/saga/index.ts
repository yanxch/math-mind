import { takeEvery } from 'redux-saga/effects';
import { join } from '..';

function* saveWebsocketConnection(action: any) {
    console.log('Saved the WS connection..', action);
}

export function* mySaga() {
    yield takeEvery(join.type, saveWebsocketConnection);
}
