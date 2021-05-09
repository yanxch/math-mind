import { randomDecimalNumber, randomIntegerNumber } from '../../utils/random';
import { CalculationState } from '../state';
import { Task, TaskFactory, TaskState } from './Task';

export class Calculation implements Task {
    private state: CalculationState;

    constructor(state?: CalculationState) {
        if (state) {
            this.state = state;
        } else {
            this.state = Calculation.newCalculationState();
        }
    }

    static fromState(state: TaskState) {
        return new Calculation(state as CalculationState);
    }

    static newCalculationState(): CalculationState {
        const operator = '*';
        const calculation = [
            randomDecimalNumber(10, 1),
            operator,
            randomIntegerNumber(10),
        ];
        const result = eval(calculation.join(' '));

        return { operator, calculation, result, type: Calculation };
    }

    asState(): CalculationState {
        return this.state;
    }

    isCorrect(calculationState: CalculationState) {
        return (calculationState.result === this.state.result)
    }
}

export class CalculationTaskFactory implements TaskFactory {
    newTask(): Task {
        return new Calculation();
    }
}
