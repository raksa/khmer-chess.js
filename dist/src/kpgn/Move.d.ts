import { PieceIndex, REN } from '../ren';
import Piece from '../ren/Piece';
import Point from '../ren/Point';
import Captured from './Captured';
export declare type Option = {
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
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
    jumpingCodes: {
        [key: string]: boolean;
    };
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isUpgrading: boolean;
    captured: Captured | null;
    constructor({ piece, moveFrom, moveTo, isUpgrading, captured, }: Option);
    setRen(ren: REN): void;
    get isWhiteKingJumping(): boolean;
    get isWhiteQueenJumping(): boolean;
    get isBlackKingJumping(): boolean;
    get isBlackQueenJumping(): boolean;
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
        jumpingCodes: string;
        capturedPiece: string;
    };
    getJumpingMessage(isEnglish?: boolean): string;
    getMessage(isEnglish?: boolean): string;
}
