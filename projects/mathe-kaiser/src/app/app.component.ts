import { Component, ChangeDetectorRef } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { EasyCalculationService } from './calculation.easy';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'mathe-kaiser';
    r: number;
    currentCalculation = this.easyCalculation.calculationParts();

    constructor(
        private easyCalculation: EasyCalculationService,
        private cdr: ChangeDetectorRef
    ) {}

    checkResult(value) {
        const result = eval(`${this.currentCalculation.join(' ')}`);
        console.log(value, result);

        if (Number(result) === Number(value)) {
            this.r = null;
            this.easyCalculation.newCalculation();
            this.currentCalculation = this.easyCalculation.calculationParts();
        }
    }
}
