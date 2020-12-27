import { Empty, Message, Play } from '../models';

export class WaitingForPlayerMessage implements Message<Play> {
    type: string;
    payload: Play;
    constructor(paylpoad: Play) {
        this.type = 'WAITING_FOR_PLAYERS';
        this.payload = paylpoad;
    }
}
