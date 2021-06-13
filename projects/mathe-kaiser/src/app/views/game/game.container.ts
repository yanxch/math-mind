import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameState, State } from "@server/math-mind";
import { store } from "projects/mathe-kaiser/src/redux";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
    selector: 'GameContainer',
    template: `
        <Game [gameState]="game$ | async">
        </Game>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameContainer {

    game$: Observable<GameState>;

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

    }
}