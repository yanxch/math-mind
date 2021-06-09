import { Injectable } from "@angular/core";
import { State } from "@server/math-mind";
import { store } from "../../redux";

@Injectable({
    providedIn: 'root'
})
export class ReduxStateService {

    state: State;

    constructor() {
        store.subscribe(() => {
            this.state = store.getState();
        })
    }
}