import { Move } from '../kpgn';
/**
 * King or Queen has jumped, the will effect jumping
 */
export default class KqJumped {
    whiteKing: boolean;
    whiteQueen: boolean;
    blackKing: boolean;
    blackQueen: boolean;
    keyCodes: {
        [key: string]: string;
    };
    codeKeys: {
        [key: string]: string;
    };
    constructor(kqJumpedStr?: string);
    applyJumping(propKey: string, move: Move): void;
    unJumped(code: string): void;
    checkKQMoved(move: Move): void;
    toString(): string;
}
