import Piece from './Piece';
import Point from './Point';
export default class PieceIndex {
    point: Point;
    piece: Piece | null;
    canMovePoints: Point[];
    constructor(point: Point, piece: Piece | null);
    toCode(): string | null;
    toPieceCharCode(): string;
}
