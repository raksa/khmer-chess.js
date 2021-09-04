import REN from '../ren/REN';
import Move from './Move';
import Player from './Player';
import Result from './Result';
import Timer from './Timer';
import type { Option as TimeOption } from './Timer';
import type { Option as ResultOption } from './Result';
import type { Option as PlayerOption } from './Player';
import base64Helper from '../other/base64Helper';

export type Option = {
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
    event: string = '';
    date: Date | null = null;
    location: string = '';
    players = {
        white: new Player({}),
        black: new Player({}),
    };
    result = {
        last: {
            whiteWin: false,
            blackWin: false,
        },
        white: new Result({}),
    };

    moves: Move[];
    ren: REN;
    timer: Timer = new Timer({});

    constructor(ren: REN) {
        this.ren = ren;
        this.moves = [];
    }

    get isCanMoveNext() {
        return this.latestMove.isCanMoveNext && this.ren.isCanMoveNext;
    }

    get latestMove() {
        return this.moves[this.moves.length - 1] || null;
    }

    addMove(move: Move) {
        if (move) {
            this.moves.push(move);
            return true;
        }
        return false;
    }
    getMove(index: number) {
        return this.moves[index] || null;
    }

    loadRENStr(renStr?: string) {
        this.ren = REN.fromString(renStr);
        if (this.latestMove) {
            this.ren.syncWithMove(this.latestMove);
        }
    }

    loadMovesStrings(moves: string[]) {
        let currentRen = this.ren;
        this.moves = moves.reverse().map((moveStr) => {
            const move = Move.fromString(moveStr, currentRen);
            currentRen = currentRen.backRen(move);
            return move;
        }).reverse();
        if (this.latestMove) {
            this.ren.syncWithMove(this.latestMove);
        }
    }

    validateOption(option: Option) {
        // TODO: throw when invalid option's properties
    }

    fromJson(option: Option) {
        this.validateOption(option);
        const { ren, moves, timer, result,
            players, location, date, event } = option;

        this.event = event || this.event;
        this.date = date ? new Date(date) : this.date;
        this.location = location || this.location;
        if (players) {
            this.players = {
                white: new Player(players.white),
                black: new Player(players.black),
            };
        }
        if (result) {
            this.result = {
                last: result.last,
                white: new Result(result.white),
            };
        }
        this.ren = REN.fromString(ren || '');
        this.loadMovesStrings(moves || []);
        this.timer = new Timer(timer || {});
    }

    toJson(): Option {
        let renStr = this.ren.toString();
        if (this.latestMove) {
            renStr = this.latestMove.renStr;
        }
        return {
            event: this.event,
            date: this.date ? this.date.toString() : '',
            location: this.location,
            players: {
                white: this.players.white.toJson(),
                black: this.players.black.toJson(),
            },
            result: {
                last: {
                    whiteWin: this.result.last.whiteWin,
                    blackWin: this.result.last.blackWin,
                },
                white: this.result.white.toJson(),
            },
            timer: this.timer.toJson(),
            moves: this.moves.map((m) => m.toString()),
            ren: renStr,
        };
    }

    fromBase64(str: string) {
        const json = JSON.parse(base64Helper.decode(str));
        this.fromJson(json);
    }
    toBase64() {
        const jsStr = JSON.stringify(this.toJson());
        return base64Helper.encode(jsStr);
    }
}
/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *---------------------------------------------------------------------------- */