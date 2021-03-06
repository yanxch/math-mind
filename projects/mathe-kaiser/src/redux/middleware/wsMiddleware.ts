import { Injectable } from '@angular/core';
import { doNothing } from '..';
import { WebsocketService } from '../../app/websocket/websocket.service';

export class WebsocketMiddleware {
    constructor(private websocketService: WebsocketService) { }

    fn = ({ getState, dispatch }) => next => action => {
        if (action.type === 'games/hydrate') {
            console.log('skip hydrate..: ', action);
            next(action);
        } else {
            console.log('WebsocketMiddleware in Action: ', action);
            this.websocketService.websocket$.next(action);
            next(doNothing({}));
        }
    };
}
