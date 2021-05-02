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
    if (game.isCorrectAnswer(answer)) {
        const player = game.getPlayerByUsername(username);
        player.playerGameState.points += 10;
        // TODO: save success event
    } else {
        // TODO: save try event
    }
}

export function selectGameState(state: State, gameCode: string) {
    return state.games[gameCode];
}