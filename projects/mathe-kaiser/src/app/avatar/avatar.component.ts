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
        '#ED3B15',
        '#F7B52B',
        '#1CC564',
        '#D3F72B',
        '#6DF72B',
        '#2BF74F',
        '#2BF7B5',
        '#2BC6F7',
        '#2B60F7',
        '#C22BF7',
        '#F72BC6',
    ];

    selectedColor = '#ED3B15';

    constructor(private stateService: StateService) {}

    ngOnInit(): void {}

    chooseColor(color: string) {
        this.selectedColor = color;
        this.stateService.setAvatarColor(color);
    }
}
