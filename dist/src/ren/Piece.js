"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var constant_1 = require("../brain/constant");
var jsis_1 = __importDefault(require("../brain/jsis"));
var Piece = /** @class */ (function () {
    function Piece(type, color) {
        this.type = Piece.toNormalCharCode(type);
        this.color = color;
    }
    Object.defineProperty(Piece.prototype, "colorOpponent", {
        get: function () {
            return Piece.oppositeColor(this.color);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "pieceCharCode", {
        get: function () {
            if (this.isColorWhite) {
                return this.pieceCharCodeWhite;
            }
            return this.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "pieceCharCodeWhite", {
        get: function () {
            return Piece.toWhiteCharCode(this.type);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "title", {
        get: function () {
            return "" + constant_1.PIECE_NAMES[this.type] + constant_1.COLOR_NAMES[this.color];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "titleEnglish", {
        get: function () {
            return constant_1.COLOR_NAMES_ENGLISH[this.color] + "-" + constant_1.PIECE_NAMES_ENGLISH[this.type];
        },
        enumerable: false,
        configurable: true
    });
    Piece.prototype._isTypeEqual = function (type) {
        return this.type === type;
    };
    Object.defineProperty(Piece.prototype, "isTypeKing", {
        get: function () {
            return this._isTypeEqual(constant_1.PIECE_TYPE_KING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isTypeQueen", {
        get: function () {
            return this._isTypeEqual(constant_1.PIECE_TYPE_QUEEN);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isTypeBoat", {
        get: function () {
            return this._isTypeEqual(constant_1.PIECE_TYPE_BOAT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isTypeHorse", {
        get: function () {
            return this._isTypeEqual(constant_1.PIECE_TYPE_HORSE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isTypeGeneral", {
        get: function () {
            return this._isTypeEqual(constant_1.PIECE_TYPE_GENERAL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isTypeFish", {
        get: function () {
            return this._isTypeEqual(constant_1.PIECE_TYPE_FISH);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isTypeTransformedFish", {
        get: function () {
            return this._isTypeEqual(constant_1.PIECE_TYPE_TRANSFORM_FISH);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isColorBlack", {
        get: function () {
            return Piece.isBlackColor(this.color);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "isColorWhite", {
        get: function () {
            return Piece.isWhiteColor(this.color);
        },
        enumerable: false,
        configurable: true
    });
    Piece.fromCharCode = function (charCode) {
        if (!Piece.isValidPiece(charCode)) {
            return null;
        }
        var color = Piece.isWhiteCharCode(charCode) ? constant_1.PIECE_COLOR_WHITE : constant_1.PIECE_COLOR_BLACK;
        var type = Piece.toNormalCharCode(charCode);
        return new Piece(type, color);
    };
    Object.defineProperty(Piece.prototype, "originPiece", {
        get: function () {
            if (this.isTypeTransformedFish) {
                return new Piece(constant_1.PIECE_TYPE_FISH, this.color);
            }
            return this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece, "pieceChars", {
        get: function () {
            return [
                constant_1.PIECE_TYPE_BOAT,
                constant_1.PIECE_TYPE_HORSE,
                constant_1.PIECE_TYPE_GENERAL,
                constant_1.PIECE_TYPE_KING,
                constant_1.PIECE_TYPE_QUEEN,
                constant_1.PIECE_TYPE_FISH,
                constant_1.PIECE_TYPE_TRANSFORM_FISH,
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece, "colorChars", {
        get: function () {
            return [
                constant_1.PIECE_COLOR_WHITE,
                constant_1.PIECE_COLOR_BLACK,
            ];
        },
        enumerable: false,
        configurable: true
    });
    Piece.toWhiteCharCode = function (charCode) {
        return charCode.toUpperCase();
    };
    Piece.isWhiteCharCode = function (charCode) {
        return jsis_1.default.isUpperCase(charCode);
    };
    Piece.toBlackCharCode = function (charCode) {
        return charCode.toLowerCase();
    };
    Piece.toNormalCharCode = function (charCode) {
        return Piece.toBlackCharCode(charCode);
    };
    Piece.isValidPiece = function (charCode) {
        return charCode !== constant_1.EMPTY_PIECE;
    };
    Piece.isWhiteColor = function (color) {
        return color === constant_1.PIECE_COLOR_WHITE;
    };
    Piece.isBlackColor = function (color) {
        return color === constant_1.PIECE_COLOR_BLACK;
    };
    Piece.oppositeColor = function (color) {
        return Piece.isWhiteColor(color) ? constant_1.PIECE_COLOR_BLACK : constant_1.PIECE_COLOR_WHITE;
    };
    Piece.isValidPiecesString = function (str, onlyPiece) {
        var ruler = onlyPiece ? allPiecesString.filter(function (c) {
            return !~[constant_1.EMPTY_PIECE, constant_1.BOARD_SEPARATOR].indexOf(c);
        }) : allPiecesString;
        return !str.split('').some(function (c) {
            return !~ruler.indexOf(c);
        });
    };
    return Piece;
}());
exports.default = Piece;
var allPiecesString = __spreadArray(__spreadArray(__spreadArray([], Piece.pieceChars), Piece.pieceChars.map(function (pieceChar) {
    return Piece.toWhiteCharCode(pieceChar);
})), [
    constant_1.EMPTY_PIECE,
    constant_1.BOARD_SEPARATOR,
]);
