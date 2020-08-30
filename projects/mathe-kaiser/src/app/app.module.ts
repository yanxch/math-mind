import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';

import { AngularKawaiiModule } from 'angular-kawaii';
import { SuccessComponent } from './game/success/success.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MenuButtonComponent } from './game/menu-button/menu-button.component';
import { DropdownComponent } from './game/dropdown/dropdown.component';

@NgModule({
    declarations: [
        AppComponent,
        NumberComponent,
        LoginComponent,
        GameComponent,
        SuccessComponent,
        AvatarComponent,
        MenuButtonComponent,
        DropdownComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularKawaiiModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
