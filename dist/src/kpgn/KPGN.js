"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __importDefault(require("./Player"));
var Result_1 = __importDefault(require("./Result"));
/**
 * Khmer portable game notation
 */
// TODO: improve KPGN
var KPGN = /** @class */ (function () {
    function KPGN(renInstant) {
        this.players = {
            white: new Player_1.default(),
            black: new Player_1.default(),
        };
        this.result = {
            last: {
                whiteWin: false,
                blackWin: false,
            },
            white: new Result_1.default(),
        };
        this.renInstant = renInstant;
        this.moves = [];
    }
    KPGN.prototype.toJson = function () {
        return {
            event: this.event,
            date: this.date,
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
            moves: this.moves.map(function (m) { return m.toJson(); }),
            ren: this.renInstant.toString(),
            timer: this.timer.toJson(),
        };
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