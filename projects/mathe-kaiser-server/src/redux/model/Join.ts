import { isNumber } from '../../utils/number';
import { JoinState } from '../state';

export class Join {
    private joinCode: string;
    private gameCode: string;
    private playerNumber: string;
    private username: string;

    private constructor({
        joinCode,
        gameCode,
        playerNumber,
        username,
    }: JoinState) {
        this.joinCode = joinCode;
        this.gameCode = gameCode;
        this.playerNumber = playerNumber;
        this.username = username;
    }

    static fromString(joinCode: string, username: string) {
        const splittedCode = joinCode.split('-');
        if (splittedCode.length !== 2) {
            throw new Error('Invalid code. Length');
        }
        if (!isNumber(splittedCode[1])) {
            throw new Error('Invalid code. Number');
        }
        const gameCode = splittedCode[0];
        const playerNumber = splittedCode[1];
        return new Join({ joinCode: joinCode, gameCode, playerNumber, username });
    }

    static fromState(state: JoinState) {
        return new Join(state);
    }

    asState(): JoinState {
        return {
            joinCode: this.joinCode,
            gameCode: this.gameCode,
            playerNumber: this.playerNumber,
            username: this.username,
        };
    }

    getPlayerNumber() {
        return this.playerNumber;
    }

    getGameCode() {
        return this.gameCode;
    }

    getConnectionKey() {
        return this.gameCode;
    }
}
