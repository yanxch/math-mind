import { ReadyToPlayMessage } from '../messages/ready-to-play';
import { State } from '../models';

export function onReadyToPlay(state: State, message: ReadyToPlayMessage) {
    const play = message.payload;

    const connection1 = play.player1?.connection;
    const connection2 = play.player2?.connection;

    const json = JSON.stringify(message);

    connection1?.send(json);
    connection2?.send(json);
}
