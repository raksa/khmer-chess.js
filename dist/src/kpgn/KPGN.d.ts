import REN from '../ren/REN';
import Move from './Move';
import Player from './Player';
import Result from './Result';
import Timer from './Timer';
import type { Option as TimeOption } from './Timer';
import type { Option as ResultOption } from './Result';
import type { Option as PlayerOption } from './Player';
export declare type Option = {
    event?: string;
    date?: string;
    location?: string;
    players?: {
        white: PlayerOption;
        black: PlayerOption;
    };
    result?: {
        last: {
            whiteWin: boolean;
            blackWin: boolean;
        };
        white: ResultOption;
    };
    moves?: string[];
    ren?: string;
    timer?: TimeOption;
};
export default class KPGN {
    event: string;
    date: Date | null;
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
    ren: REN;
    timer: Timer;
    constructor(ren: REN);
    get isCanMoveNext(): boolean;
    get latestMove(): Move;
    addMove(move: Move | null): boolean;
    getMove(index: number): Move | null;
    loadRENStr(renStr?: string): void;
    loadMovesStrings(moves: string[]): void;
    fromJson(option: Option): boolean;
    toJson(): {
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
    fromBase64(str: string): boolean;
    toBase64(): string;
}
