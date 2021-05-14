import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    websocket$: WebSocketSubject<any>;

    constructor() {
        const HOST = environment.production
            ? location.origin.replace(/^http/, 'ws')
            : 'ws://localhost:8080';
        this.websocket$ = webSocket(HOST);
        this.websocket$.subscribe(
            (msg) => {
                // get message and dispatch it as redux action

                console.log('message received: ', msg);
            },
            (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            () => console.log('complete') // Called when connection is closed (for whatever reason).
        )
    }
}