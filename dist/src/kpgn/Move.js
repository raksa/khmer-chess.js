"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var brain_1 = require("../brain");
var ren_1 = require("../ren");
var constant_1 = require("../ren/constant");
var Piece_1 = __importDefault(require("../ren/Piece"));
var Point_1 = __importDefault(require("../ren/Point"));
var Captured_1 = __importDefault(require("./Captured"));
var Move = /** @class */ (function () {
    function Move(_a) {
        var piece = _a.piece, moveFrom = _a.moveFrom, moveTo = _a.moveTo, isUpgrading = _a.isUpgrading, captured = _a.captured;
        this.boardStatus = {
            attacker: null,
            winColor: null,
            stuckColor: null,
            drawCountColor: null,
        };
        this.isStartCounting = false;
        this.piece = piece;
        this.moveFrom = moveFrom;
        this.moveTo = moveTo;
        this.isUpgrading = !!isUpgrading;
        this.captured = captured || null;
        if (brain_1.boardHelper.isUpgradable(piece, moveTo)) {
            this.isUpgrading = true;
            piece.upgrade();
        }
        this.kqJumping = new ren_1.KqJumped();
    }
    Move.prototype.setRen = function (ren) {
        ren.checkBoardStatus(this);
        ren.kqJumped.checkKQMoved(this);
        this.renStr = ren.toString();
    };
    Object.defineProperty(Move.prototype, "isCanMoveNext", {
        get: function () {
            return !(this.boardStatus.drawCountColor || this.boardStatus.winColor || this.boardStatus.stuckColor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "isWhiteKingJumping", {
        get: function () {
            return !!this.kqJumping.whiteKing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "isWhiteQueenJumping", {
        get: function () {
            return !!this.kqJumping.whiteQueen;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "isBlackKingJumping", {
        get: function () {
            return !!this.kqJumping.blackKing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "isBlackQueenJumping", {
        get: function () {
            return !!this.kqJumping.blackQueen;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "attacker", {
        get: function () {
            return this.boardStatus.attacker || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "winColor", {
        get: function () {
            return this.boardStatus.winColor || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "stuckColor", {
        get: function () {
            return this.boardStatus.stuckColor || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "drawCountColor", {
        get: function () {
            return this.boardStatus.drawCountColor || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "isDraw", {
        get: function () {
            return this.stuckColor || this.drawCountColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Move.prototype, "isGameOver", {
        get: function () {
            return this.winColor || this.isDraw;
        },
        enumerable: false,
        configurable: true
    });
    Move.fromString = function (str, ren) {
        var piece = Piece_1.default.fromCharCode(str[0]);
        var moveFrom = Point_1.default.fromIndexCode(str.substr(1, 2));
        var moveTo = Point_1.default.fromIndexCode(str.substr(3, 2));
        var move = new Move({
            piece: piece,
            moveFrom: moveFrom,
            moveTo: moveTo,
        });
        var killIndex = str.indexOf(constant_1.PIECE_FLAG_KILL);
        if (!!~killIndex) {
            var gyIndex = Number(str.substr(killIndex + 1).match(/^(\d+)/)[1]);
            var capturedPiece = ren.graveyard.get(gyIndex);
            if (!capturedPiece) {
                throw new Error('Invalid captured index');
            }
            move.captured = new Captured_1.default({
                fromBoardPoint: moveTo,
                toGraveyardPoint: Point_1.default.fromIndexGraveyardIndex(gyIndex),
                piece: capturedPiece,
            });
        }
        var jumpingIndex = str.indexOf(constant_1.PIECE_FLAG_JUMP);
        if (!!~jumpingIndex) {
            var n = Number(str.substr(jumpingIndex + 1).match(/^(\d+)/)[1]);
            move.kqJumping = ren_1.KqJumped.fromNumber(n);
        }
        var startCountingIndex = str.indexOf(constant_1.PIECE_FLAG_START_COUNTING);
        if (!!~startCountingIndex) {
            move.isStartCounting = true;
        }
        move.setRen(ren);
        return move;
    };
    Move.prototype.toString = function () {
        var pCode = this.piece.pieceCharCode;
        var fIndexCode = this.moveFrom.indexCode;
        var tIndexCode = this.moveTo.indexCode;
        var flags = '';
        if (this.captured) {
            flags += constant_1.PIECE_FLAG_KILL + this.captured.toGraveyardPoint.index;
        }
        if (this.kqJumping.isJumped) {
            flags += constant_1.PIECE_FLAG_JUMP + this.kqJumping.toNumber();
        }
        if (this.isUpgrading) {
            flags += constant_1.PIECE_FLAG_UPGRADE;
        }
        if (this.isStartCounting) {
            flags += constant_1.PIECE_FLAG_START_COUNTING;
        }
        return "" + pCode + fIndexCode + tIndexCode + flags;
    };
    Move.prototype.getJumpingMessage = function (isEnglish) {
        var jump = '';
        if (isEnglish) {
            if (this.isWhiteKingJumping) {
                jump += ' white king jumping';
            }
            if (this.isWhiteQueenJumping) {
                jump += ' white queen jumping';
            }
            if (this.isBlackKingJumping) {
                jump += ' black king jumping';
            }
            if (this.isBlackQueenJumping) {
                jump += ' black queen jumping';
            }
        }
        else {
            if (this.isWhiteKingJumping) {
                jump += ' ស្តេច​ស​ភ្លោះ';
            }
            if (this.isWhiteQueenJumping) {
                jump += ' នាង​ស​ភ្លោះ';
            }
            if (this.isBlackKingJumping) {
                jump += ' ស្តេច​ខ្មៅ​ភ្លោះ';
            }
            if (this.isBlackQueenJumping) {
                jump += ' នាង​ខ្មៅ​ភ្លោះ';
            }
        }
        return jump;
    };
    Move.prototype.getMessage = function (isEnglish) {
        if (isEnglish) {
            var captured = '';
            if (this.captured) {
                captured = " captures " + this.captured.piece.titleEnglish;
            }
            var upgrade = this.isUpgrading ? ' transforms' : '';
            var jump = this.getJumpingMessage(isEnglish);
            return this.piece.titleEnglish + " moved from " + this.moveFrom.titleEnglish + " to " + this.moveTo.titleEnglish + upgrade + captured + " " + jump;
        }
        else {
            var captured = '';
            if (this.captured) {
                captured = " \u179F\u17CA\u17B8" + this.captured.piece.title;
            }
            var upgrade = this.isUpgrading ? ' បក' : '';
            var jump = this.getJumpingMessage(isEnglish);
            return this.piece.title + " \u178A\u17BE\u179A\u200B\u1796\u17B8 " + this.moveFrom.title + " \u1791\u17C5 " + this.moveTo.title + upgrade + captured + " " + jump;
        }
    };
    return Move;
}());
exports.default = Move;
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
//# sourceMappingURL=Move.js.map