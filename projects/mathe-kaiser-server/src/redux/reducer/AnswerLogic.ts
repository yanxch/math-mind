import { PayloadAction } from "@reduxjs/toolkit";
import { AnswerState } from "../model/Answer";
import { Game } from "../model/Game";
import { State } from "../state";

export type AnswerAction = {
    username: string;
    gameCode: string;
    answer: AnswerState;
};
export function answerLogic(state: State, action: PayloadAction<AnswerAction>) {
    // TODO Test
    const { username, gameCode, answer } = action.payload;
    const game = Game.fromGameCode(gameCode)
    if (game.isCorrectAnswer(answer)) {
        const player = game.getPlayerByUsername(username);
        player.playerGameState.points += 10;
        // TODO: save success event
    } else {
        // TODO: save try event
    }

}