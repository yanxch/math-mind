import { AnswerState } from "./Answer";

export interface Task {
    asState(): TaskState;
    isCorrect(answer: AnswerState): boolean;
    // fromState(taskState: TaskState); // Problem brauch static
}

export interface TaskState {
    [key: string]: any;
    type: Type<Task>;
}

export interface Type<T> extends Function {
    new(...args: any[]): T;
}