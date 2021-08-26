import REN from '../ren/REN';
import Move from './Move';
import Player from './Player';
import Result from './Result';
import Timer from './Timer';
/**
 * Khmer portable game notation
 */
export default class KPGN {
    event: string;
    date: string;
    location: string;
    players: {
        white: Player;
        black: Player;
    };
    result: {
        last: {
            whiteWin: boolean;
            blackWin: boolean;
        };
        white: Result;
    };
    moves: Move[];
    renInstant: REN;
    timer: Timer;
    constructor(renInstant: REN);
    toJson(): {
        event: string;
        date: string;
        location: string;
        players: {
            white: {
                id: string;
                name: string;
            };
            black: {
                id: string;
                name: string;
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
        moves: {
            fromIndex: number;
            toIndex: number;
            isJumping: boolean;
            capturedPiece: string;
        }[];
        ren: string;
        timer: {
            totalSecond: string;
            currentWhite: string;
            currentBlack: string;
        };
    };
}
