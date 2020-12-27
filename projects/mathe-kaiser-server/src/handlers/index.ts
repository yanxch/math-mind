import ws from "ws";
import { Message } from "../models";
import { state } from "../state";
import { onMessageCode } from "./code-message-handler";

export function handleMessage(message: Message<any>, connection?: ws) {
    console.log('handle message: ', message);

    if (message.type === 'CODE') {
        const result = onMessageCode(state, message, connection!);
        handleMessage(result);
    }

    if (message.type === 'READY_TO_PLAY') {
        
    }
}