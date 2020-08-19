import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EasyCalculationService as FirstLevelCalculationService } from '../calculation.easy';
import { SecondLevelCalculationService } from '../calculation.2nd';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent {
    result = new FormControl();

    currentCalculation = this.secondLevelCalculation.calculationParts();

    constructor(
        private firstLevelCalculation: FirstLevelCalculationService,
        private secondLevelCalculation: SecondLevelCalculationService
    ) {
        this.result.valueChanges.subscribe((value) => this.checkResult(value));
    }

    checkResult(value: any) {
        const result = eval(`${this.currentCalculation.join(' ')}`);
        console.log(value, result);

        if (Number(result).toFixed(3) === Number(value).toFixed(3)) {
            this.result.setValue(null);
            this.secondLevelCalculation.newCalculation();
            this.currentCalculation = this.secondLevelCalculation.calculationParts();
        }
    }
}
