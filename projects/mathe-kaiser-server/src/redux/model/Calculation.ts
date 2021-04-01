import { randomDecimalNumber, randomIntegerNumber } from "../../utils/random";
import { CalculationState } from "../state";

export class Calculation {
    private operator: string;
    private calculation: any[];
    private result: number;

    private constructor({ operator, calculation, result }: CalculationState) {
        this.operator = operator;
        this.calculation = calculation;
        this.result = result;
    }

    static newCalculation() {
        const operator = '*';
        const calculation = [ randomDecimalNumber(10, 1), operator, randomIntegerNumber(10) ];
        const result = eval(calculation.join(' '));

        return new Calculation({ operator, calculation, result });
    }

    static fromState(state: CalculationState) {
        return new Calculation(state);
    }

    asState(): CalculationState {
        return {
            calculation: this.calculation,
            operator: this.operator,
            result: this.result
        };
    }
}