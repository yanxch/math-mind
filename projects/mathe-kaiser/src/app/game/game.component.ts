import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EasyCalculationService as FirstLevelCalculationService } from '../calculation.easy';
import { SecondLevelCalculationService } from '../calculation.2nd';
import { FormControl } from '@angular/forms';
import { StateService } from '../state/state.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent {
    result = new FormControl();
    showSuccess = false;

    points$ = this.stateService.points$;
    avatar$ = this.stateService.avatar$;
    avatarColor$ = this.stateService.avatarColor$;

    currentCalculation = this.secondLevelCalculation.calculationParts();

    constructor(
        private firstLevelCalculation: FirstLevelCalculationService,
        private secondLevelCalculation: SecondLevelCalculationService,
        private stateService: StateService
    ) {
        this.result.valueChanges.subscribe((value) => this.checkResult(value));
    }

    checkResult(value: any) {
        const result = eval(`${this.currentCalculation.join(' ')}`);
        console.log(value, result);

        const isCorrect =
            Number(result).toFixed(3) === Number(value).toFixed(3);

        if (isCorrect) {
            this.stateService.incrementPoints(10);
            this.showSuccess = true;

            setTimeout(() => {
                this.showSuccess = false;
                this.result.setValue(null);
                this.secondLevelCalculation.newCalculation();
                this.currentCalculation = this.secondLevelCalculation.calculationParts();
            }, 2000);
        }
    }
}
