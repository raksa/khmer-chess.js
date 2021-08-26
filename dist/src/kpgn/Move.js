"use strict";
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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var brain_1 = require("../brain");
var constant_1 = require("../ren/constant");
var Piece_1 = __importDefault(require("../ren/Piece"));
var Point_1 = __importDefault(require("../ren/Point"));
var Captured_1 = __importDefault(require("./Captured"));
var Move = /** @class */ (function () {
    function Move(_a) {
        var piece = _a.piece, moveFrom = _a.moveFrom, moveTo = _a.moveTo, isJumping = _a.isJumping, isUpgrading = _a.isUpgrading, captured = _a.captured;
        this.piece = piece;
        this.moveFrom = moveFrom;
        this.moveTo = moveTo;
        this.isJumping = !!isJumping;
        this.isUpgrading = !!isUpgrading;
        this.captured = captured || null;
        if (brain_1.boardHelper.isUpgradable(piece, moveTo)) {
            this.isUpgrading = true;
            piece.type = brain_1.PIECE_TYPE_TRANSFORM_FISH;
        }
    }
    // Spec: Fc5d6xf => White fish (F) moved from c5 to d6 killed black fish (f)
    Move.fromMovedString = function (graveyardLastIndex) {
        // const str = 'Fc5d6j';
        var str = 'Fc5d6xf';
        var piece = Piece_1.default.fromCharCode(str[0]);
        var moveFrom = Point_1.default.fromIndexCode(str.substr(1, 2));
        var moveTo = Point_1.default.fromIndexCode(str.substr(3, 2));
        var move = new Move({
            piece: piece,
            moveFrom: moveFrom,
            moveTo: moveTo,
        });
        if (str[5] === constant_1.PIECE_FLAG_KILL) {
            var capturedPieceChar = str[6];
            move.captured = new Captured_1.default({
                fromBoardPoint: moveTo,
                toGraveyardPoint: Point_1.default.fromIndexGraveyardIndex(graveyardLastIndex),
                piece: Piece_1.default.fromCharCode(capturedPieceChar),
            });
        }
        else if (str[5] === constant_1.PIECE_FLAG_JUMP) {
            move.isJumping = true;
        }
        return move;
    };
    // Fc5d6j: jump, Fc5d6x: kill, Fc5d6xt: kill&upgrade
    Move.prototype.toString = function () {
        var pCode = this.piece.pieceCharCode;
        var fIndexCode = this.moveFrom.indexCode;
        var tIndexCode = this.moveTo.indexCode;
        var flags = this.captured ? constant_1.PIECE_FLAG_KILL : '';
        if (this.isJumping) {
            flags += constant_1.PIECE_FLAG_JUMP;
        }
        if (this.isUpgrading) {
            flags += constant_1.PIECE_FLAG_UPGRADE;
        }
        return "" + pCode + fIndexCode + tIndexCode + flags;
    };
    Move.prototype.toJson = function () {
        return {
            fromIndex: this.moveFrom.index,
            toIndex: this.moveTo.index,
            isJumping: this.isJumping,
            capturedPiece: this.captured ? this.captured.piece.pieceCharCode : null,
        };
    };
    Move.prototype.getMessage = function (isEnglish) {
        if (isEnglish) {
            var captured = '';
            if (this.captured) {
                captured = " captures " + this.captured.piece.titleEnglish;
            }
            var upgrade = this.isUpgrading ? ' transforms' : '';
            return this.piece.titleEnglish + " moved from " + this.moveFrom.titleEnglish + " to " + this.moveTo.titleEnglish + upgrade + captured;
        }
        else {
            var captured = '';
            if (this.captured) {
                captured = " \u179F\u17CA\u17B8" + this.captured.piece.title;
            }
            var upgrade = this.isUpgrading ? ' បក' : '';
            return this.piece.title + " \u178A\u17BE\u179A\u200B\u1796\u17B8 " + this.moveFrom.title + " \u1791\u17C5 " + this.moveTo.title + upgrade + captured;
        }
    };
    return Move;
}());
exports.default = Move;
