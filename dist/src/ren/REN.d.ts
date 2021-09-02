import Board from './Board';
import KqMoved from './KqMoved';
import KAttacked from './KAttacked';
import CountDown from './CountDown';
import Graveyard from './Graveyard';
import Move from '../kpgn/Move';
import Point from './Point';
import Piece from './Piece';
import { PieceIndex } from '.';
import MoveHelper from '../brain/MoveHelper';
/**
 * Raksa-Eng Notation
 * ren: <pieces on board> <turn w|b> <king&queen moved ----|SNsn> <king attack --|Kk> <countdown -.-|-.4> <pieces in graveyard>
 */
export declare type RENPropType = {
    boardStr: string;
    turnStr: string;
    kqMovedStr: string;
    kAttackedStr: string;
    countdownStr: string;
    graveyardStr: string;
};
export default class REN {
    board: Board;
    turn: string;
    kqMoved: KqMoved;
    kAttacked: KAttacked;
    countdown: CountDown;
    graveyard: Graveyard;
    moveHelper: MoveHelper;
    constructor(renProps: RENPropType);
    init({ boardStr, turnStr, kqMovedStr, kAttackedStr, countdownStr, graveyardStr }: RENPropType): void;
    isInvalidPieceCount(): string | false;
    backRen(move: Move): REN;
    static fromString(renStr?: string): REN;
    move(moveFromIndex: number, moveToIndex: number): Move | null;
    moveBack(move: Move): boolean;
    toString(): string;
    get isQueenMoved(): boolean;
    get isKingMoved(): boolean;
    genAllCanMoves(): PieceIndex[];
    isHasMoved(piece: Piece): boolean;
    getCanMovePointsByPoint(point: Point): Point[];
    getAttacker(): PieceIndex | null;
    getWinColor(): string | null;
}
