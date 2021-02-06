import { Game } from "../model/Game";
import { JoinCode } from "../model/JoinCode";
import { PlayerState, State } from "../state";

export function join(state: State, action: {payload: { joinCode: string, username: string }}) {
    const joinCode = JoinCode.fromString(action.payload.joinCode);
    const gameCode = joinCode.getGameCode();
    const playerNumber = joinCode.getPlayerNumber();
    const gameState = state.games[gameCode];
  
    let game: Game;
    if (!gameState) {
        game = Game.fromGameCode(gameCode);
        game.addNewPlayer(joinCode);
    } else {
        game = Game.fromState(gameState);
        game.addNewPlayer(joinCode);
    }
  
    return {
        ...state,
        [gameCode]: game.asState()
    };
  }