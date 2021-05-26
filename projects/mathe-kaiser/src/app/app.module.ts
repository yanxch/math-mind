import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent, LoginModule } from './views/avatar-login/avatar-login.component';
import { GameComponent } from './game/game.component';

import { AngularKawaiiModule } from 'angular-kawaii';
import { SuccessComponent } from './game/success/success.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MenuButtonComponent } from './game/menu-button/menu-button.component';
import { DropdownComponent } from './game/dropdown/dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { InvitationComponent } from './invitation/invitation.component';
import { Game2Component } from './game2/game2.component';
import { AvatarsListComponentModule } from './components/avatars-list/avatars-list.component';
import { NavigationBarComponentModule } from './components/navigation-bar/navigation-bar.component';
import { UsernameInputComponentModule } from './components/username-input/username-input.component';
import { ButtonModule } from './components/action-button/action-button.component';

export function windowFactory() {
    return window;
}

@NgModule({
    declarations: [
        AppComponent,
        NumberComponent,
        GameComponent,
        SuccessComponent,
        AvatarComponent,
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
        LoginModule
    ],
    providers: [{ provide: 'window', useFactory: windowFactory }],
    bootstrap: [AppComponent],
})
export class AppModule { }
