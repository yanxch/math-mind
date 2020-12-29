import { Message } from "../models";

type ResultPayload = {
    result: string,
    code: string
};

export class ResultMessage implements Message<ResultPayload> {
    type: string;
    payload: ResultPayload;

    constructor(payload: ResultPayload) {
        this.type = 'RESULT';
        this.payload = payload;
    }
}