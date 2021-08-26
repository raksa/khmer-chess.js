import Piece from '../ren/Piece';
import Point from '../ren/Point';
export declare type CapturedPropType = {
    piece: Piece;
    fromBoardPoint: Point;
    toGraveyardPoint: Point;
};
export default class Captured implements CapturedPropType {
    piece: Piece;
    fromBoardPoint: Point;
    toGraveyardPoint: Point;
    constructor({ piece, fromBoardPoint: fromBoardPoint, toGraveyardPoint: toGraveyardPoint }: CapturedPropType);
}
