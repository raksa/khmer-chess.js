import { PieceIndex, REN } from '../ren';
import Piece from '../ren/Piece';
import Point from '../ren/Point';
import Captured from './Captured';
export declare type Option = {
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isJumping?: boolean;
    isUpgrading?: boolean;
    captured?: Captured;
};
export default class Move {
    renStr: string;
    boardStatus: {
        attacker?: PieceIndex;
        winColor?: string;
        stuckColor?: string;
        drawCountColor?: string;
    };
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isJumping: boolean;
    isUpgrading: boolean;
    captured: Captured | null;
    constructor({ piece, moveFrom, moveTo, isJumping, isUpgrading, captured, }: Option);
    setRen(ren: REN): void;
    get attacker(): PieceIndex;
    get winColor(): string;
    get stuckColor(): string;
    get drawCountColor(): string;
    get isDraw(): string;
    get isGameOver(): string;
    static fromMovedString(str: string, ren: REN): Move;
    toString(): string;
    toJson(): {
        fromIndex: number;
        toIndex: number;
        isJumping: boolean;
        capturedPiece: string;
    };
    getMessage(isEnglish?: boolean): string;
}
