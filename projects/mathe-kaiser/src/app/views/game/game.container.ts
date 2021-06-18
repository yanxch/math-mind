import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AnswerAction, GameState, State } from "@server/math-mind";
import { AnswerState } from 'projects/mathe-kaiser-server/src/redux/model/Task';
import { answer, store } from "projects/mathe-kaiser/src/redux";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
    selector: 'GameContainer',
    template: `
        <Game 
            [gameState]="game$ | async"
            [username]="username$ | async"
            (checkAnswer)="checkAnswer($event)">
        </Game>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameContainer {

    game$: Observable<GameState>;
    username$: Observable<string>;

    constructor(private route: ActivatedRoute) {
        this.game$ = route.paramMap
            .pipe(
                map(params => params.get('code')),
                filter(code => !!code),
                map(code => {
                    const state: State = store.getState()
                    const game = state.games[code];
                    return game;
                })
            );
        this.username$ = route.paramMap
            .pipe(
                map(params => params.get('username')),
                filter(username => !!username)
            );
    }

    checkAnswer(answerAction: AnswerAction) {
        store.dispatch(answer(answerAction));
    }
}