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
    getMove(index: number): Move;
    loadRENStr(renStr?: string): void;
    loadMovesStrings(moves: string[]): void;
    validateOption(option: Option): void;
    fromJson(option: Option): void;
    toJson(): Option;
    fromBase64(str: string): void;
    toBase64(): string;
}
