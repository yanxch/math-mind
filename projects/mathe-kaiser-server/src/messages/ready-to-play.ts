import { Message, Play } from '../models';

export class ReadyToPlayMessage implements Message<Play> {
    type: string;
    payload: Play;

    constructor(payload: Play) {
        this.type = 'READY_TO_PLAY';
        this.payload = payload;
    }
}
