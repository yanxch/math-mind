import { CalculationService } from './calculation';
import {
    randomDecimalNumber,
    randomOperator,
    randomIntegerNumber,
} from './random';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SecondLevelCalculationService extends CalculationService {
    number1: number;
    number2: number;
    operator: string;

    constructor() {
        super();
        this.newCalculation();
    }

    newCalculation() {
        this.number1 = randomDecimalNumber(10, 1);
        this.number2 = randomIntegerNumber(10);
        this.operator = randomOperator();
    }

    calculationParts(): any[] {
        return [this.number1, this.operator, this.number2];
    }
}
