import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from "../../environments/environment";
import { hydrate, store } from '../../redux';

export class WebsocketService {
    websocket$: WebSocketSubject<any>;
    connected = false;

    constructor() {
        const HOST = environment.production
            ? location.origin.replace(/^http/, 'ws')
            : 'ws://localhost:8080';
        this.websocket$ = webSocket(HOST);
        this.websocket$.subscribe(
            (state) => { // whole ws message is our state (hopefully)
                store.dispatch(hydrate({ state }));
                console.log('ws message received: ', state);
                this.connected = true;
            },
            (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            () => console.log('complete') // Called when connection is closed (for whatever reason).
        )
    }
}