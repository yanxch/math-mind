import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createSelector } from '@reduxjs/toolkit';
import { AnswerAction, GameState, PlayerState, State } from "@server/math-mind";
import { answer, store } from 'projects/mathe-kaiser/src/redux';
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
        <!-- Observables -->
        <ng-container *ngIf="gamecode$ | async"></ng-container>
        <ng-container *ngIf="username$ | async"></ng-container>
        <ng-container *ngIf="points$ | async"></ng-container>
        <!-- -->
        <Game 
            [gameState]="gameState"
            [playerState]="playerState"
            [points]="points"
            (checkAnswer)="checkAnswer($event)">
        </Game>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameContainer implements OnDestroy {

    gamecode$: Observable<string>;
    username$: Observable<string>;
    points$: Observable<number>;

    gameState: GameState;
    playerState: PlayerState;
    username: string;
    gamecode: string;
    points: number;

    unsubscribe: Unsubscribe;

    constructor(private route: ActivatedRoute) {
        this.gamecode$ = route.paramMap
            .pipe(
                map(params => params.get('code')),
                filter(code => !!code),
                tap(code => this.gamecode = code),
                tap(code => {
                    this.gameState = selectGame(code)(store.getState());
                })
            );
        this.username$ = route.paramMap
            .pipe(
                map(params => params.get('username')),
                filter(username => !!username),
                tap(username => this.username = username),
                tap(username => {
                    this.playerState = selectPlayer(this.gamecode, username)(store.getState());
                })
            );

        this.points$ = route.paramMap
            .pipe(
                map(params => params.get('username')),
                filter(username => !!username),
                map(username => {
                    const playerState = selectPlayer(this.gamecode, username)(store.getState());
                    return playerState.playerGameState.points;
                }),
                tap(points => {
                    this.points = points;
                })
            )

        this.unsubscribe = store.subscribe(() => {
            this.playerState = selectPlayer(this.gamecode, this.username)(store.getState())
            this.gameState = selectGame(this.gamecode)(store.getState());
            this.points = this.playerState.playerGameState.points;
        })
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    checkAnswer(answerAction: AnswerAction) {
        store.dispatch(answer(answerAction));
    }
}
