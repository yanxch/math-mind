import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularKawaiiModule } from 'angular-kawaii';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from './components/action-button/action-button.component';
import { AvatarsListComponentModule } from './components/avatars-list/avatars-list.component';
import { NavigationBarComponentModule } from './components/navigation-bar/navigation-bar.component';
import { UsernameInputComponentModule } from './components/username-input/username-input.component';
import { DropdownComponent } from './views/game/dropdown/dropdown.component';
import { GameComponent } from './views/game/game.component';
import { MenuButtonComponent } from './views/game/menu-button/menu-button.component';
import { SuccessComponent } from './views/game/success/success.component';
import { Game2Component } from './game2/game2.component';
import { InvitationComponent } from './invitation/invitation.component';
import { NumberComponent } from './number/number.component';
import { LoginModule } from './views/join/join.component';
import { GameContainer } from './views/game/game.container';
import { hydrate, store } from '../redux';

export function windowFactory() {
    return window;
}

@NgModule({
    declarations: [
        AppComponent,
        NumberComponent,
        GameContainer,
        GameComponent,
        SuccessComponent,
        MenuButtonComponent,
        DropdownComponent,
        InvitationComponent,
        Game2Component,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularKawaiiModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        // SCAMS
        AvatarsListComponentModule,
        NavigationBarComponentModule,
        UsernameInputComponentModule,
        ButtonModule,
        LoginModule,
    ],
    providers: [{ provide: 'window', useFactory: windowFactory }],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
        const state = this.loadStateFromLocalStorage();
        if (state) {
            console.log('loading state from local storage: ', state);
            store.dispatch(hydrate(state));
        }
    }

    private loadStateFromLocalStorage() {
        try {
            const persistedState = localStorage.getItem('math-mind-state');
            if (persistedState) {
                return JSON.parse(persistedState);
            }
        } catch (e) {
            console.log(e);
        }
    }
}
