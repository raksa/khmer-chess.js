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
    get isJumped(): boolean;
    setProp(key: string, value: boolean): void;
    applyJumping(propKey: string, move: Move): void;
    checkKQMoved(move: Move): void;
    toString(): string;
    toNumber(): number;
    static fromNumber(n: number): KqJumped;
}
