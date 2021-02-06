import { configureStore, createSlice } from '@reduxjs/toolkit';
import { join } from './reducer/Join';
import { State } from './state';

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



function ready(state: State, action: any) {
  return state;
}