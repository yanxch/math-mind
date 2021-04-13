export interface Task {
    asState(): TaskState;
    isCorrect(taskState: TaskState): boolean;
}

export interface TaskState {
    [key: string]: any;
}