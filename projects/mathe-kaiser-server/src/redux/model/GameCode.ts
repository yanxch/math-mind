import { randomReadableWord } from '../../utils/randomWord';

export function createGameCode(length: number) {
    return randomReadableWord(length);
}
