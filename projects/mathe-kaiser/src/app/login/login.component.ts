import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StateService } from '../state/state.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    constructor(private stateService: StateService, private router: Router) {}

    ngOnInit(): void {}

    chooseAvatar(name: string) {
        console.log('Chose avatar: ', name);
        this.stateService.setAvatar(name);
        this.router.navigate(['avatar']);
    }
}
