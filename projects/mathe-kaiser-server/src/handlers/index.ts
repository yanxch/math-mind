import ws from 'ws';
import { Message } from '../models';
import { state } from '../state';
import { onMessageCode } from './code-message-handler';
import { onReadyToPlay } from './ready-to-play-message-handler';
import { onResultMessage } from './result-message-handler';

export function handleMessage(message: Message<any>, connection?: ws) {
    console.log('handle message: ', message);

    if (message.type === 'CODE') {
        const result = onMessageCode(state, message, connection!);
        handleMessage(result);
    }

    if (message.type === 'READY_TO_PLAY') {
        onReadyToPlay(state, message);
    }

    if (message.type === 'RESULT') {
        const result = onResultMessage(state, message);
        handleMessage(result);
    }
}
