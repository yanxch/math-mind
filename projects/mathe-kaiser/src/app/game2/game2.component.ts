import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { StateService } from '../state/state.service';

enum Status {
    INITIAL = 'INITIAL',
    WAITING = 'WAITING',
    PLAYING = 'PLAYING',
    ENDED = 'ENDED',
}

@Component({
    templateUrl: './game2.component.html',
    styleUrls: ['./game2.component.css'],
})
export class Game2Component implements OnInit, OnDestroy {
    code$: Observable<number>;
    websocket$: WebSocketSubject<any>;

    subscription: Subscription = new Subscription();

    currentCalculation = [];
    result = new FormControl();
    showSuccess = false;
    showMenu = false;

    code: string;

    points$ = this.stateService.points$;
    avatar$ = this.stateService.avatar$;
    avatarColor$ = this.stateService.avatarColor$;

    @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;

    constructor(
        private route: ActivatedRoute,
        private stateService: StateService
    ) {
        const HOST = environment.production
            ? location.origin.replace(/^http/, 'ws')
            : 'ws://localhost:8080';
        this.websocket$ = webSocket(HOST);

        this.subscription.add(
            this.route.params
                .pipe(
                    map((params) => params.code),
                    tap(console.log),
                    tap((code) => (this.code = code))
                )
                .subscribe((code) => {
                    this.joind(code);
                })
        );

        this.subscription.add(
            this.websocket$.subscribe(
                (msg) => {
                    if (msg.type === 'READY_TO_PLAY') {
                        console.log(
                            'We are ready to play the first round:',
                            msg
                        );

                        this.currentCalculation = msg.calculation;
                    }

                    console.log('message received: ', msg);
                },
                (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
                () => console.log('complete') // Called when connection is closed (for whatever reason).
            )
        );

        this.result.valueChanges.subscribe((value) => this.checkResult(value));
    }

    ngOnInit(): void {
        // Register with Code at websocket
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    checkResult(value: any) {
        const result = eval(`${this.currentCalculation.join(' ')}`);
        // console.log(value, result);

        const isCorrect =
            Number(result).toFixed(3) === Number(value).toFixed(3);

        if (isCorrect) {
            this.stateService.incrementPoints(10);
            this.showSuccess = true;

            setTimeout(() => {
                this.showSuccess = false;
                this.result.setValue(null);
                this.sendResult(value, this.code);

                // Waiting for other player
            }, 2000);
        }
    }

    joind(code) {
        // should this be triggered by redux?
        this.websocket$.next({ type: 'games/joined', payload: { joinCode: code } });
    }

    sendResult(result: string, code: string) {
        this.websocket$.next({
            type: 'RESULT',
            payload: {
                result,
                code,
            },
        });
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }

    pressed(char: string) {
        this.result.setValue((this.result.value || '') + char);
    }

    pressedDelete() {
        const currentValue: string = this.result.value;
        const newValue = currentValue.substring(0, currentValue.length - 1);
        this.result.setValue(newValue);
    }

    // Status: INITIAL -> REGISTERED -> WAITING -> PLAY
}
