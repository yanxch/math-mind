import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Code, JoinCode } from '../models';
import { Game, State } from './state';

const counterSlice = createSlice({
    name: 'games',
    initialState: { games: {}},
    reducers: {
      join,
      ready
    }
  })

const {reducer, actions} = counterSlice;

let store = configureStore({
    reducer
});

store.subscribe(() => console.log(store.getState()))

store.dispatch(actions.join({ joinCode: 'ae3rgd-1', username: 'janksi'}))

function join(state: State, action: {payload: { joinCode: string, username: string }}) {
  const code = new JoinCode(action.payload.joinCode);

  const gameCode = code.getGameCode();
  const playerNumber = code.getPlayerNumber();

  const game: Game = state.games[gameCode];

  if (game) {

  } else {
    
  }

  return state;
}

function ready(state: State, action: any) {
  return state;
}