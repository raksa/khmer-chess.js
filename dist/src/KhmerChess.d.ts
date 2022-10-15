import KPGN from './kpgn/KPGN';
import Move from './kpgn/Move';
import { PieceIndex } from './ren';
import Point from './ren/Point';
export default class KhmerChess {
    static title: string;
    static version: string;
    kpgn: KPGN;
    constructor(renStr?: string);
    loadKpng(option: object): void;
    resetBoard(): void;
    getCanMoves(): PieceIndex[];
    getCanMovePointsByPoint(point: Point): Point[];
    validateRENStr(renStr: string): {
        valid: boolean;
        error_number: number;
        error: string;
    };
    getRENStr(): string;
    get piecesInBoardMultiArray(): (import("./ren").Piece | null)[][];
    get piecesInBoard(): (import("./ren").Piece | null)[];
    get piecesInGraveyard(): import("./ren").Piece[];
    getKPGN(): {
        event: string;
        date: string;
        location: string;
        players: {
            white: {
                id: string | null;
                name: string | null;
            };
            black: {
                id: string | null;
                name: string | null;
            };
        };
        result: {
            last: {
                whiteWin: boolean;
                blackWin: boolean;
            };
            white: {
                win: number;
                draw: number;
                lost: number;
            };
        };
        timer: {
            totalSecond: number;
            bonusTime: number;
            currentWhite: number;
            currentBlack: number;
        };
        moves: string[];
        ren: string;
    };
    loadKpgn(kpgnJosn: any, options: any): void;
    drawAscii(): string;
    get turn(): string;
    set turn(turn: string);
    move(moveFromIndex: number, moveToIndex: number): Move | null;
    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    clearBoard(): void;
    getHistories(): Move[];
    static toKhmerNum(englishNum: number): string;
}
