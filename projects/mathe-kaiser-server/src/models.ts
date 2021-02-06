import ws from 'ws';
import {JoinState} from './redux/state';

export interface State {
    connections: { [key: string]: Play };
}

export interface Message<T> {
    type: string;
    payload: T;
}





export class Play {
    player1?: Player;
    player2?: Player;
    calculation?: any[];

    hasPlayer1() {
        return this.player1 !== undefined;
    }

    hasPlayer2() {
        return this.player2 !== undefined;
    }
}

export class Player {
    connected = false;
    code: JoinCode | undefined;
    connection: ws;
    constructor(code: JoinCode, connection: ws) {
        this.connected = true;
        this.code = code;
        this.connection = connection;
    }
}

export class Empty {}
