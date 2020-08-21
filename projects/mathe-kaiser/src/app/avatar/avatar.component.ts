import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StateService } from '../state/state.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
    avatar$ = this.stateService.avatar$;

    colors = [
        '#f2b0a5',
        '#b33a3a',
        '#b8e3ea',
        '#a9bcc6',
        '#c7aabc',
        '#513e5c',
        '#02334a',
        '#d0d0b8',
        '#40817a',
        '#003b32',
        '#f6b4da',
        '#fde482',
        '#bad7c8',
        '#e9d5be',
        '#ce9d8e',
        '#111b1e',
        '#2f4c58',
        '#63a583',
        '#6e93d6',
        '#e4dbd9',
        '#490009',
        '#ac0e28',
        '#bc4558',
        '#013766',
        '#010a1c',
        '#487549',
        '#abba82',
        '#a7b5b7',
        '#037c87',
        '#102020',
    ];

    selectedColor = '#bc4558';

    constructor(private stateService: StateService) {}

    ngOnInit(): void {}

    chooseColor(color: string) {
        this.selectedColor = color;
        this.stateService.setAvatarColor(color);
    }
}
