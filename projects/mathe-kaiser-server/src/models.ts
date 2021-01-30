import ws from 'ws';

export interface State {
    connections: { [key: string]: Play };
}

export interface Message<T> {
    type: string;
    payload: T;
}

function isNumber(number: string) {
    return !isNaN(parseInt(number));
}

export class JoinCode {
    private value: string;
    private gameCode: string;
    private playerNumber: string;

    constructor(value: string) {
        const splittedCode = value.split('-');
        if (splittedCode.length !== 2) {
            throw new Error('Invalid code. Length');
        }
        if (!isNumber(splittedCode[1])) {
            throw new Error('Invalid code. Number');
        }
        this.gameCode = splittedCode[0];
        this.playerNumber = splittedCode[1];
        this.value = value;
    }

    isPlayer1() {
        return this.value.endsWith('-1');
    }

    isPlayer2() {
        return this.value.endsWith('-2');
    }

    getPlayerNumber() {
        return this.playerNumber;
    }

    getGameCode() {
        return this.gameCode;
    }

    getConnectionKey() {
        return this.value.substring(0, this.value.length - 2);
    }
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
