import { isNumber } from "../../utils/number";
import { JoinState } from "../state";

export class JoinCode {
    private value: string;
    private gameCode: string;
    private playerNumber: string;

    private constructor({value, gameCode, playerNumber}: JoinState) {
        this.value = value;
        this.gameCode = gameCode;
        this.playerNumber = playerNumber;
    }

    static fromString(value: string) {
        const splittedCode = value.split('-');
        if (splittedCode.length !== 2) {
            throw new Error('Invalid code. Length');
        }
        if (!isNumber(splittedCode[1])) {
            throw new Error('Invalid code. Number');
        }
        const gameCode = splittedCode[0];
        const playerNumber = splittedCode[1];
        return new JoinCode({value, gameCode, playerNumber});
    }

    static fromState(state: JoinState) {
        return new JoinCode(state);
    }

    asState(): JoinState {
        return {
            value: this.value,
            gameCode: this.gameCode,
            playerNumber: this.playerNumber
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