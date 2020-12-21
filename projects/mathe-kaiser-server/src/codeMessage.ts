import { Code, Message, Play, Player, State } from "./models";

export function onMessageCode(state: State, message: Message<Code>) {
    const code = message.payload;
    const connectionKey = code.getConnectionKey();
    const play = state.connections[connectionKey];

    if (code.isPlayer1()) {
        if (!play.hasPlayer1()) {
            play.player1 = new Player(code);
        }
    }
    if (code.isPlayer2()) {
        if (!play.hasPlayer1()) {
            play.player2 = new Player(code);
        }
    }

    if (play.hasPlayer1 && play.hasPlayer2) {
        return 'READY_TO_PLAY';
    } else {
        return 'WAITING_FOR_PLAYERS';
    }
}