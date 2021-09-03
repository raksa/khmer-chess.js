"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../brain/constant");
var constant_2 = require("./constant");
var Piece_1 = __importDefault(require("./Piece"));
/**
 * King or Queen has jumped, the will effect jumping
 */
var KqJumped = /** @class */ (function () {
    function KqJumped(kqJumpedStr) {
        var _a;
        this.whiteKing = false;
        this.whiteQueen = false;
        this.blackKing = false;
        this.blackQueen = false;
        this.keyCodes = {
            blackKing: Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_QUEEN),
            whiteKing: Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_KING),
            whiteQueen: constant_1.PIECE_TYPE_KING,
            blackQueen: constant_1.PIECE_TYPE_QUEEN,
        };
        this.codeKeys = (_a = {},
            _a[Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_QUEEN)] = 'blackKing: ',
            _a[Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_KING)] = 'whiteKing: ',
            _a[constant_1.PIECE_TYPE_KING] = 'whiteQueen: ',
            _a[constant_1.PIECE_TYPE_QUEEN] = 'blackQueen: ',
            _a);
        if (kqJumpedStr) {
            this.whiteKing = !!~kqJumpedStr.indexOf(Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_KING));
            this.whiteQueen = !!~kqJumpedStr.indexOf(Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_QUEEN));
            this.blackKing = !!~kqJumpedStr.indexOf(constant_1.PIECE_TYPE_KING);
            this.blackQueen = !!~kqJumpedStr.indexOf(constant_1.PIECE_TYPE_QUEEN);
        }
    }
    Object.defineProperty(KqJumped.prototype, "isJumped", {
        get: function () {
            return this.whiteKing || this.whiteQueen || this.blackKing || this.blackQueen;
        },
        enumerable: false,
        configurable: true
    });
    KqJumped.prototype.setProp = function (key, value) {
        this[key] = value;
    };
    KqJumped.prototype.applyJumping = function (propKey, move) {
        if (!this[propKey]) {
            move.kqJumping.setProp(propKey, true);
            this.setProp(propKey, true);
        }
    };
    KqJumped.prototype.checkKQMoved = function (move) {
        if (move.attacker || move.captured) {
            this.applyJumping('whiteKing', move);
            this.applyJumping('blackKing', move);
            this.applyJumping('whiteQueen', move);
            this.applyJumping('blackQueen', move);
        }
        var piece = move.piece;
        if (piece.isTypeKing) {
            if (piece.isColorWhite) {
                this.applyJumping('whiteKing', move);
            }
            else {
                this.applyJumping('blackKing', move);
            }
        }
        else if (piece.isTypeQueen) {
            if (piece.isColorWhite) {
                this.applyJumping('whiteQueen', move);
            }
            else {
                this.applyJumping('blackQueen', move);
            }
        }
    };
    KqJumped.prototype.toString = function () {
        var str = "" + (this.whiteKing ? Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_KING) : constant_2.NOT_SET);
        str += "" + (this.whiteQueen ? Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_QUEEN) : constant_2.NOT_SET);
        str += "" + (this.blackKing ? constant_1.PIECE_TYPE_KING : constant_2.NOT_SET);
        str += "" + (this.blackQueen ? constant_1.PIECE_TYPE_QUEEN : constant_2.NOT_SET);
        return str;
    };
    KqJumped.prototype.toNumber = function () {
        var str = "" + (this.whiteKing ? 1 : 0);
        str += "" + (this.whiteQueen ? 1 : 0);
        str += "" + (this.blackKing ? 1 : 0);
        str += "" + (this.blackQueen ? 1 : 0);
        return parseInt(str, 2);
    };
    KqJumped.fromNumber = function (n) {
        var b = ('0000' + Number(n).toString(2)).substr(-4);
        var kqJumped = new KqJumped();
        kqJumped.whiteKing = b[0] === '1';
        kqJumped.whiteQueen = b[1] === '1';
        kqJumped.blackKing = b[2] === '1';
        kqJumped.blackQueen = b[3] === '1';
        return kqJumped;
    };
    return KqJumped;
}());
exports.default = KqJumped;
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
//# sourceMappingURL=KqJumped.js.map