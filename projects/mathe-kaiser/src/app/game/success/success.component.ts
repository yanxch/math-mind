import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'Success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
