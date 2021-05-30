import {
    JoinState,
    PlayerGameState,
    PlayerState,
    PlayerStatus,
} from '../state';

export class Player {
    private joinState: JoinState;
    private status: PlayerStatus;
    private playerGameState: PlayerGameState;

    private constructor({ joinState, status, playerGameState }: PlayerState) {
        this.joinState = joinState;
        this.status = status;
        this.playerGameState = playerGameState;
    }

    static fromState(state: PlayerState) {
        return new Player(state);
    }

    asState(): PlayerState {
        return {
            joinState: this.joinState,
            status: this.status,
            playerGameState: this.playerGameState,
        };
    }
}
