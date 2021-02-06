import { JoinState, PlayerState, PlayerStatus } from "../state";

export class Player {
    private username: string;
    private joinState: JoinState;
    private status: PlayerStatus;

    private constructor({username, joinState, status}: PlayerState) {
        this.username = username;
        this.joinState = joinState;
        this.status = status;
    }

    static fromState(state: PlayerState) {
        return new Player(state);
    }

    asState(): PlayerState {
        return {
            username: this.username,
            joinState: this.joinState,
            status: this.status
        };
    }
}