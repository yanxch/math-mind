import { Component, HostListener } from '@angular/core';
import { StateService } from './state/state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'mathe-kaiser';

    constructor(private stateService: StateService) { }

    @HostListener('window:beforeunload')
    saveState() {
        console.log('On Unload');
        this.stateService.saveState();
    }

    @HostListener('window:load')
    getState() {
        console.log('On Load');
        this.stateService.loadSavedState();
    }
}
