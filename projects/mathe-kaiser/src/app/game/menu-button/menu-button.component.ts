import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'Menu-Button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuButtonComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
