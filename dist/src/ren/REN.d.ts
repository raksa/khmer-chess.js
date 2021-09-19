import Board from './Board';
import KqJumped from './KqJumped';
import KAttacked from './KAttacked';
import CountUp from './CountUp';
import Graveyard from './Graveyard';
import Move from '../kpgn/Move';
import Point from './Point';
import Piece from './Piece';
import { PieceIndex } from '.';
import MoveHelper from '../brain/MoveHelper';
/**
 * Raksa-Eng Notation
 * ren: <pieces on board> <turn w|b> <king&queen moved ----|SNsn> <king attack --|Kk> <countUp -.-|-.4> <pieces in graveyard>
 */
export declare type RENPropType = {
    boardStr: string;
    turnStr: string;
    kqJumpedStr: string;
    kAttackedStr: string;
    countUpStr: string;
    graveyardStr: string;
};
export default class REN {
    board: Board;
    turn: string;
    kqJumped: KqJumped;
    kAttacked: KAttacked;
    countUp: CountUp;
    graveyard: Graveyard;
    moveHelper: MoveHelper;
    constructor(renProps: RENPropType);
    isInvalidPieceCount(): string | false;
    backRen(move: Move): REN;
    get isCanMoveNext(): boolean;
    move(moveFromIndex: number, moveToIndex: number): Move | null;
    moveBack(move: Move): boolean;
    static fromString(renStr?: string): REN;
    toString(): string;
    get isQueenMoved(): boolean;
    get isKingMoved(): boolean;
    genAllCanMoves(): PieceIndex[];
    isHasMoved(piece: Piece): boolean;
    getCanMovePointsByPoint(point: Point): Point[];
    checkBoardStatus(move: Move, force?: boolean): void;
    checkCountStatus(move: Move, force?: boolean): void;
    getWinColor(): string | null;
    syncWithMove(move: Move): void;
}
