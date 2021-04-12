export abstract class Task {
    static newTask(): Task;
    asState(): TaskState;
    fromState(state: TaskState): Task;
}

export interface TaskState {}