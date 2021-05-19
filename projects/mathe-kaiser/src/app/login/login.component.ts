import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state/state.service';

@Component({
    selector: 'AvatarLogin',
    template: `
        <nav>
            <NavigationBar></NavigationBar>
        </nav>
        <main>
            <AvatarsList 
                (selectedAvatar)="nextScreen($event)">
            </AvatarsList>
            <UsernameInput></UsernameInput>
        </main>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    constructor(private stateService: StateService, private router: Router) { }

    ngOnInit(): void { }

    nextScreen(name: string) {
        this.stateService.setAvatar(name);
        this.router.navigate(['avatar']);
    }
}
