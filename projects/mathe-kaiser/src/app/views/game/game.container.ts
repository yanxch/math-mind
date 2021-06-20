import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { createSelector } from '@reduxjs/toolkit';
import { AnswerAction, GameState, PlayerState, State } from "@server/math-mind";
import { answer, store } from "projects/mathe-kaiser/src/redux";
import { Unsubscribe } from 'redux-saga';
import { Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

const selectGame = (gamecode: string) => (state: State) => state.games[gamecode];

const selectPlayer = (gamecode: string, username: string) => createSelector(
    selectGame(gamecode),
    (game: GameState) => game.players.find(player => player.joinState.username === username)
);

@Component({
    selector: 'GameContainer',
    template: `
        <ng-container *ngIf="{
            game: game$ | async,
            userame: username$ | async
        }"></ng-container>
        <Game 
            [gameState]="gameState"
            [playerState]="playerState"
            [username]="username$ | async"
            (checkAnswer)="checkAnswer($event)">
        </Game>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameContainer implements OnDestroy {

    game$: Observable<GameState>;
    username$: Observable<string>;

    gameState: GameState;
    playerState: PlayerState;
    username: string;
    gamecode: string;

    unsubscribe: Unsubscribe;

    constructor(private route: ActivatedRoute) {
        this.game$ = route.paramMap
            .pipe(
                map(params => params.get('code')),
                filter(code => !!code),
                tap(code => this.gamecode = code),
                map(code => {
                    const state: State = store.getState()
                    const game = state.games[code];
                    this.gameState = game;
                    return game;
                })
            );
        this.username$ = route.paramMap
            .pipe(
                map(params => params.get('username')),
                filter(username => !!username),
                tap(username => this.username = username)
            );

        this.unsubscribe = store.subscribe(() => {
            this.playerState = selectPlayer(this.gamecode, this.username)(store.getState())
            this.gameState = selectGame(this.gamecode)(store.getState());
        })
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    checkAnswer(answerAction: AnswerAction) {
        store.dispatch(answer(answerAction));
    }
}
