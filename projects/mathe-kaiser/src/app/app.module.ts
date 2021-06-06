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
import { DropdownComponent } from './game/dropdown/dropdown.component';
import { GameComponent } from './game/game.component';
import { MenuButtonComponent } from './game/menu-button/menu-button.component';
import { SuccessComponent } from './game/success/success.component';
import { Game2Component } from './game2/game2.component';
import { InvitationComponent } from './invitation/invitation.component';
import { NumberComponent } from './number/number.component';
import { LoginModule } from './views/join/join.component';

export function windowFactory() {
    return window;
}

@NgModule({
    declarations: [
        AppComponent,
        NumberComponent,
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
export class AppModule {}
