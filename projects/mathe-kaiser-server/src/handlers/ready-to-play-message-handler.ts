import { ReadyToPlayMessage } from '../messages/ready-to-play';
import { State } from '../models';
import { randomDecimalNumber, randomIntegerNumber } from '../utils/random';

export function onReadyToPlay(state: State, message: ReadyToPlayMessage) {
    const play = message.payload;

    const connection1 = play.player1!.connection;
    const connection2 = play.player2!.connection;

    const calculation = [
        randomDecimalNumber(10, 1),
        '*',
        randomIntegerNumber(10),
    ];

    play.calculation = calculation;

    // write to the clients
    // different messages for the client
    const messageForClient = {
        type: message.type,
        calculation,
    };

    const json = JSON.stringify(messageForClient);

    connection1.send(json);
    connection2.send(json);
}
