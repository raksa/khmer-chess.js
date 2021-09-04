import Piece from '../ren/Piece';
import PieceIndex from '../ren/PieceIndex';
import Point from '../ren/Point';
export declare type OptionsType = {
    piecesString: string;
    currentTurn: string;
    isQueenMoved: boolean;
    isKingMoved: boolean;
    genCanMove: boolean;
    genCanMoveForAnother: boolean;
};
export declare type CalCountPropsType = {
    color: string;
    piecesString: string;
    force: boolean;
};
export default class MoveHelper implements OptionsType {
    piecesString: string;
    currentTurn: string;
    isQueenMoved: boolean;
    isKingMoved: boolean;
    genCanMove: boolean;
    genCanMoveForAnother: boolean;
    whiteMoves: PieceIndex[];
    blackMoves: PieceIndex[];
    whiteKingInDanger: Point[] | null;
    whiteKingWillInDanger: Point[] | null;
    blackKingInDanger: Point[] | null;
    blackKingWillInDanger: Point[] | null;
    winColor: string | null;
    stuckColor: string | null;
    get isWhiteTurn(): boolean;
    init(option: OptionsType): void;
    generateCanMoves(): void;
    cleanPieceNoMove(): void;
    checkIfKingInDanger(): void;
    genWinLost(): void;
    getStuck(): void;
    calcCanMove(option: OptionsType): {
        moves: PieceIndex[];
        anotherMoves: PieceIndex[];
    };
    calcState(option: OptionsType): {
        blackKingInDanger: Point[] | null;
        whiteKingInDanger: Point[] | null;
        blackKingWillInDanger: Point[] | null;
        whiteKingWillInDanger: Point[] | null;
        winColor: string | null;
        stuckColor: string | null;
    };
    calCount({ color, piecesString, force }: CalCountPropsType): import("./boardHelper").CountUpState | null;
    genCanMovePointsByPiecePoint(point: Point, piece: Piece, piecesString: string, isHasMoved?: boolean): Point[];
}
