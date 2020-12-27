import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

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

    subscription: Subscription;

    constructor(private route: ActivatedRoute) {
        this.code$ = this.route.params.pipe(
            map((params) => params.code),
            tap(console.log)
        );

        this.websocket$ = webSocket('ws://localhost:8080');
        this.subscription = this.websocket$.subscribe(
            (msg) => console.log('message received: ', msg), // Called whenever there is a message from the server.
            (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            () => console.log('complete') // Called when connection is closed (for whatever reason).
        );
    }

    ngOnInit(): void {
        // Register with Code at websocket
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    send(code) {
        this.websocket$.next({ type: 'CODE', payload: code });
    }

    // Status: INITIAL -> REGISTERED -> WAITING -> PLAY
}
