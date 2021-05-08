import { AnswerState } from "./Answer";

export interface Task {
    asState(): TaskState;
    isCorrect(answer: AnswerState): boolean;
    // fromState(taskState: TaskState); // Problem brauch static
}

export interface TaskState {
    [key: string]: any;
}
