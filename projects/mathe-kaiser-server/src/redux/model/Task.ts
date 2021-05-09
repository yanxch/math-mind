export interface Task {
    asState(): TaskState;
    isCorrect(answer: AnswerState): boolean;
}

export interface TaskState {
    [key: string]: any;
}

export interface AnswerState {
    [key: string]: any;
}

export interface TaskFactory {
    newTask(): Task;
}