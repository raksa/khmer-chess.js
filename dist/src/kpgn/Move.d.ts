import Piece from '../ren/Piece';
import Point from '../ren/Point';
import Captured from './Captured';
export declare type MovePropType = {
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isJumping?: boolean;
    isUpgrading?: boolean;
    captured?: Captured;
};
export default class Move implements MovePropType {
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isJumping?: boolean;
    isUpgrading?: boolean;
    captured?: Captured;
    constructor({ piece, moveFrom, moveTo, isJumping, isUpgrading, captured, }: MovePropType);
    static fromMovedString(graveyardLastIndex: number): Move;
    toString(): string;
    toJson(): {
        fromIndex: number;
        toIndex: number;
        isJumping: boolean;
        capturedPiece: string;
    };
    getMessage(isEnglish?: boolean): string;
}
