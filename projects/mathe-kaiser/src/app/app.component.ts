import { Component, ChangeDetectorRef } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { EasyCalculationService } from './calculation.easy';
import { NgModel, FormControl } from '@angular/forms';
import { SecondLevelCalculationService } from './calculation.2nd';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'mathe-kaiser';
}
