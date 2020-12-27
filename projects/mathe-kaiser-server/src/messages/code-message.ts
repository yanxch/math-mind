import { Code, Message } from '../models';

export class CodeMessage implements Message<string> {
    type: string;
    payload: string;

    constructor(payload: string) {
        this.type = 'CODE';
        this.payload = payload;
    }
}
