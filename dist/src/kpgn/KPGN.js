"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var REN_1 = __importDefault(require("../ren/REN"));
var Move_1 = __importDefault(require("./Move"));
var Player_1 = __importDefault(require("./Player"));
var Result_1 = __importDefault(require("./Result"));
var Timer_1 = __importDefault(require("./Timer"));
var KPGN = /** @class */ (function () {
    function KPGN(ren) {
        this.event = '';
        this.date = null;
        this.location = '';
        this.players = {
            white: new Player_1.default({}),
            black: new Player_1.default({}),
        };
        this.result = {
            last: {
                whiteWin: false,
                blackWin: false,
            },
            white: new Result_1.default({}),
        };
        this.timer = new Timer_1.default({});
        this.ren = ren;
        this.moves = [];
    }
    Object.defineProperty(KPGN.prototype, "latestMove", {
        get: function () {
            return this.moves[this.moves.length - 1] || null;
        },
        enumerable: false,
        configurable: true
    });
    KPGN.prototype.loadRENStr = function (renStr) {
        this.ren = REN_1.default.fromString(renStr);
    };
    KPGN.prototype.loadMovesStrings = function (moves) {
        var currentRen = this.ren;
        this.moves = moves.reverse().map(function (moveStr) {
            var move = Move_1.default.fromString(moveStr, currentRen);
            currentRen = currentRen.backRen(move);
            return move;
        }).reverse();
    };
    KPGN.prototype.validateOption = function (option) {
        // TODO: throw when invalid option's properties
    };
    KPGN.prototype.fromJson = function (option) {
        this.validateOption(option);
        var ren = option.ren, moves = option.moves, timer = option.timer, result = option.result, players = option.players, location = option.location, date = option.date, event = option.event;
        this.event = event || this.event;
        this.date = date ? new Date(date) : this.date;
        this.location = location || this.location;
        if (players) {
            this.players = {
                white: new Player_1.default(players.white),
                black: new Player_1.default(players.black),
            };
        }
        if (result) {
            this.result = {
                last: result.last,
                white: new Result_1.default(result.white),
            };
        }
        this.ren = REN_1.default.fromString(ren || '');
        this.loadMovesStrings(moves || []);
        this.timer = new Timer_1.default(timer || {});
    };
    KPGN.prototype.toJson = function () {
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
            moves: this.moves.map(function (m) { return m.toString(); }),
            ren: this.ren.toString(),
        };
    };
    KPGN.prototype.fromBase64 = function (str) {
        // TODO:
    };
    KPGN.prototype.toBase64 = function () {
        // TODO:
        return '';
    };
    return KPGN;
}());
exports.default = KPGN;
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
//# sourceMappingURL=KPGN.js.map