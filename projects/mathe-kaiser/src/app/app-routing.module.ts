import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { AvatarComponent } from './avatar/avatar.component';
import { InvitationComponent } from './invitation/invitation.component';
import { Game2Component } from './game2/game2.component';

const routes: Routes = [
    {
        path: 'game',
        component: GameComponent,
    },
    {
        path: 'game/:code',
        component: Game2Component,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'avatar',
        component: AvatarComponent,
    },
    {
        path: 'invitation',
        component: InvitationComponent,
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
