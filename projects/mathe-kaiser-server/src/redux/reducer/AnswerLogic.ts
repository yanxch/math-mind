import { PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../model/Game";
import { AnswerState, Task, TaskFactory } from "../model/Task";
import { GameState, State } from "../state";

export type AnswerAction = {
    username: string;
    gameCode: string;
    answer: AnswerState;
};
export const answerLogic = (taskFactory: TaskFactory) => (state: State, action: PayloadAction<AnswerAction>) => {
    const { username, gameCode, answer } = action.payload;
    let gameState = selectGameState(state, gameCode);
    const game = Game.fromState(gameState);
    const player = game.getPlayerByUsername(username);

    if (game.isCorrectAnswer(answer)) {
        player.playerGameState.points += 10;
        game.newTask(taskFactory.newTask());

        setGameState(state, gameCode, game.asState());
    } else {
        // TBD
    }
}

export function selectGameState(state: State, gameCode: string) {
    return state.games[gameCode];
}

export function setGameState(state: State, gameCode: string, gameState: GameState) {
    state.games[gameCode] = gameState;
}
