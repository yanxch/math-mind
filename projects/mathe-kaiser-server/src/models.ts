export interface State {
    connections: {[key: string]: Play};
}

export interface Message<T> {
    type: string;
    payload: T;
}

export class Code {
    value: string;

    constructor(value: string) {
        this.value = value;
    }

    isPlayer1() {
        return this.value.endsWith('-1');
    }

    isPlayer2() {
        return this.value.endsWith('-2');
    }

    getConnectionKey() {
        return this.value.substring(0, this.value.length - 2);
    }
}

export class Play {
    player1?: Player;
    player2?: Player;

    hasPlayer1() {
        return this.player1 !== undefined;
    }

    hasPlayer2() {
        return this.player2 !== undefined;
    }
}

export class Player {
    connected = false;
    code: Code | undefined;
    constructor(code: Code) {
        this.connected = true;
        this.code = code;
    }
}