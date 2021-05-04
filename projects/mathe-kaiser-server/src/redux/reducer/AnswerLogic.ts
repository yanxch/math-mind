import { PayloadAction } from "@reduxjs/toolkit";
import { AnswerState } from "../model/Answer";
import { Game } from "../model/Game";
import { selectGame } from "../saga";
import { State } from "../state";

export type AnswerAction = {
    username: string;
    gameCode: string;
    answer: AnswerState;
};
export function answerLogic(state: State, action: PayloadAction<AnswerAction>) {
    const { username, gameCode, answer } = action.payload;
    const gameState = selectGameState(state, gameCode);
    const game = Game.fromState(gameState);
    const player = game.getPlayerByUsername(username);

    if (game.isCorrectAnswer(answer)) {
        player.playerGameState.points += 10;
        // TODO: new Calculation on correct answer
        // player.playerGameState.events?.push("CORRECT_ANSWER: " + new Date().toISOString());
    } else {
        // player.playerGameState.events?.push("INVALID_ANSWER: ", JSON.stringify(game.currentTask));
    }
}

export function selectGameState(state: State, gameCode: string) {
    return state.games[gameCode];
}