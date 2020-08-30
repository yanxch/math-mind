import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { AvatarComponent } from './avatar/avatar.component';

const routes: Routes = [
    {
        path: 'game',
        component: GameComponent,
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
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
