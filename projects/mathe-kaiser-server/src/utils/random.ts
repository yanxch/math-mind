const OPERATORS = ['+', '-', '*'];

export function randomIntegerNumber(end: number) {
    return Math.floor(Math.random() * end) + 1;
}

export function randomDecimalNumber(end: number, decimalDigits: number) {
    return Number((Math.random() * end).toFixed(decimalDigits));
}

export function randomOperator() {
    const n = Math.floor(Math.random() * 3);
    return OPERATORS[n];
}
