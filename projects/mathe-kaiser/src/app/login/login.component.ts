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
            <AvatarsList></AvatarsList>
            <UsernameInput></UsernameInput>
        </main>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    constructor(private stateService: StateService, private router: Router) { }

    ngOnInit(): void { }

    chooseAvatar(name: string) {
        console.log('Chose avatar: ', name);
        this.stateService.setAvatar(name);
        this.router.navigate(['avatar']);
    }
}
