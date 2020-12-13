import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class InvitationApi {
    constructor(private httpClient: HttpClient) {}

    getInvitationCode() {
        return this.httpClient
            .get<string>('/api/invitation')
            .pipe(map((body: any) => body.code));
    }
}
