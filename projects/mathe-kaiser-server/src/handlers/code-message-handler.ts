import ws from 'ws';
import { ReadyToPlayMessage } from '../messages/ready-to-play';
import { WaitingForPlayerMessage } from '../messages/waiting-for-player';
import { Code, Message, Play, Player, State } from '../models';

export function onMessageCode(
    state: State,
    message: Message<Code>,
    connection: ws
): WaitingForPlayerMessage | ReadyToPlayMessage {
    const code = message.payload;
    const connectionKey = code.getConnectionKey();
    const play = getPlay(state, connectionKey);

    if (code.isPlayer1()) {
        if (!play.hasPlayer1()) {
            play.player1 = new Player(code, connection);
        }
    }
    if (code.isPlayer2()) {
        if (!play.hasPlayer1()) {
            play.player2 = new Player(code, connection);
        }
    }

    if (play.hasPlayer1 && play.hasPlayer2) {
        return new ReadyToPlayMessage(play);
    } else {
        return new WaitingForPlayerMessage(play);
    }
}

function getPlay(state: State, connectionKey: string): Play {
    const play = state.connections[connectionKey];

    if (play) {
        return play;
    } else {
        const newPlay = new Play();
        state.connections[connectionKey] = newPlay;
        return newPlay;
    }
}
