import { Code, Message } from '../models';

export class CodeMessage implements Message<Code> {
    type: string;
    payload: Code;

    constructor(payload: Code) {
        this.type = 'CODE';
        this.payload = payload;
    }
}
