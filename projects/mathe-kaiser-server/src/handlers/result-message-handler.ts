import { ReadyToPlayMessage } from "../messages/ready-to-play";
import { ResultMessage } from "../messages/result-message";
import { WaitingForPlayerMessage } from "../messages/waiting-for-player";
import { Code, Play, State } from "../models";

export function onResultMessage(state: State, message: ResultMessage) {
    const value = message.payload.result;
    const code = new Code(message.payload.code);
    const connectionKey = code.getConnectionKey();
    const play = getPlay(state, connectionKey);
    const result = eval(`${play.calculation!.join(' ')}`);
    const isCorrect = Number(result).toFixed(3) === Number(value).toFixed(3);

    if (isCorrect) {
        return new ReadyToPlayMessage(play);
    } else {
        // not entirely correct but poc
        return new WaitingForPlayerMessage(play);
    }
}

function getPlay(state: State, connectionKey: string): Play {
    const play = state.connections[connectionKey];
    if (!play) {
        throw Error('Play not found - Sorry');
    }
    return play;
}