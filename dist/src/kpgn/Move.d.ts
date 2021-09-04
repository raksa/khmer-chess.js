import { KqJumped, PieceIndex, REN } from '../ren';
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
        attacker: PieceIndex | null;
        winColor: string | null;
        stuckColor: string | null;
        drawCountColor: string | null;
    };
    isStartCounting: boolean;
    kqJumping: KqJumped;
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isUpgrading: boolean;
    captured: Captured | null;
    constructor({ piece, moveFrom, moveTo, isUpgrading, captured, }: Option);
    setRen(ren: REN): void;
    get isCanMoveNext(): boolean;
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
    static fromString(str: string, ren: REN): Move;
    toString(): string;
    getJumpingMessage(isEnglish?: boolean): string;
    getMessage(isEnglish?: boolean): string;
}
