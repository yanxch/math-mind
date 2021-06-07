import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './views/game/game.component';
import { JoinComponent } from './views/join/join.component';
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
        path: 'join',
        component: JoinComponent,
    },
    {
        path: 'invitation',
        component: InvitationComponent,
    },
    {
        path: '**',
        redirectTo: 'join',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
