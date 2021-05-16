import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StateService } from '../state/state.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
    selector: 'AvatarLogin',
    template: `
        <nav class="bg-purple-800 p-6">
            <div class="flex justify-center text-white">
                <p class="text-2xl">
                    Wähle deinen Avatar
                </p>
            </div>
        </nav>
        <main>
            <AvatarsList></AvatarsList>
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
