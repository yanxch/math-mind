import ws from 'ws';
import { CodeMessage } from '../messages/code-message';
import { ReadyToPlayMessage } from '../messages/ready-to-play';
import { WaitingForPlayerMessage } from '../messages/waiting-for-player';
import { Message, Play, Player, State } from '../models';

export function onMessageCode(
    state: State,
    message: CodeMessage,
    connection: ws
) {}
