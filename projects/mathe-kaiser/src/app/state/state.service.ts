import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    points$ = new BehaviorSubject<number>(0);
    avatar$ = new BehaviorSubject<string>(null);
    avatarColor$ = new BehaviorSubject<string>(null);

    constructor() {}

    incrementPoints(add: number) {
        this.points$.next(this.points$.value + add);
    }

    setAvatar(name: string) {
        this.avatar$.next(name);
    }

    setAvatarColor(color: string) {
        this.avatarColor$.next(color);
    }

    saveState() {
        const state = {
            avatar: this.avatar$.value,
            avatarColor: this.avatarColor$.value,
        };
        window.localStorage.setItem('state', JSON.stringify(state));
    }

    loadSavedState() {
        const state = window.localStorage.getItem('state');
        const stateObject = JSON.parse(state);

        this.avatar$.next(stateObject.avatar);
        this.avatarColor$.next(stateObject.avatarColor);
    }
}
