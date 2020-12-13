import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InvitationApi } from '../../api/invitation-api';

@Component({
    templateUrl: './invitation.component.html',
    styleUrls: ['./invitation.component.css'],
})
export class InvitationComponent implements OnInit {
    code$: Observable<number>;

    constructor(
        private invitationApi: InvitationApi,
        private router: Router,
        @Inject('window') public window: Window
    ) {
        this.code$ = this.invitationApi.getInvitationCode();
    }

    ngOnInit(): void {}

    copy() {}

    toGame(code: number) {
        this.router.navigate(['game', code]);
    }
}
