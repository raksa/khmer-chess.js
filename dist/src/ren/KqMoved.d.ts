/**
 * King or Queen has moved, the will effect jumping
 */
export default class KqMoved {
    whiteKing: boolean;
    whiteQueen: boolean;
    blackKing: boolean;
    blackQueen: boolean;
    constructor(kqMovedStr?: string);
    toString(): string;
}
