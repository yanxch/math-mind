import { CalculationService } from './calculation';
import { randomIntegerNumber, randomOperator } from './random';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FirstLevelCalculationService extends CalculationService {
    number1: number;
    number2: number;
    operator: string;

    constructor() {
        super();
        this.newCalculation();
    }

    newCalculation() {
        this.number1 = randomIntegerNumber(10);
        this.number2 = randomIntegerNumber(10);
        this.operator = randomOperator();
    }

    calculationParts(): any[] {
        return [this.number1, this.operator, this.number2];
    }
}
