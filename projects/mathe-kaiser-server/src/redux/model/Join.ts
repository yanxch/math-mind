import { isNumber } from '../../utils/number';
import { JoinState } from '../state';

export class Join {
    private joinCode: string;
    private gameCode: string;
    private username: string;

    private constructor({
        joinCode,
        gameCode,
        username,
    }: JoinState) {
        this.joinCode = joinCode;
        this.gameCode = gameCode;
        this.username = username;
    }

    static fromString(joinCode: string) {
        const splittedCode = joinCode.split('-');
        if (splittedCode.length !== 2) {
            throw new Error('Invalid code. Length');
        }
        const gameCode = splittedCode[0];
        const username = splittedCode[1];
        return new Join({ joinCode: joinCode, gameCode, username });
    }

    static fromState(state: JoinState) {
        return new Join(state);
    }

    asState(): JoinState {
        return {
            joinCode: this.joinCode,
            gameCode: this.gameCode,
            username: this.username,
        };
    }

    getGameCode() {
        return this.gameCode;
    }

    getConnectionKey() {
        return this.gameCode;
    }
}
