const OPERATORS = ['+', '-', '*'];

export function randomNumber(end: number) {
    return Math.floor(Math.random() * end) + 1;
}

export function randomOperator() {
    const n = Math.floor(Math.random() * 3);
    return OPERATORS[n];
}
