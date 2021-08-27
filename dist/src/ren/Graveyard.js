"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __importDefault(require("./Piece"));
var Graveyard = /** @class */ (function () {
    function Graveyard(graveyardStr) {
        this.pieces = [];
        if (graveyardStr) {
            if (graveyardStr.length > 30 ||
                !Piece_1.default.isValidPiecesString(graveyardStr, true)) {
                throw new Error("Invalid graveyard string " + graveyardStr);
            }
            this.pieces = graveyardStr.split('').map(function (charCode, i) {
                var p = Piece_1.default.fromCharCode(charCode);
                if (p.isTypeKing) {
                    throw new Error("King cannot die graveyard:" + graveyardStr);
                }
                return p;
            });
        }
    }
    Object.defineProperty(Graveyard.prototype, "lastIndex", {
        get: function () {
            return this.pieces.length - 1;
        },
        enumerable: false,
        configurable: true
    });
    Graveyard.prototype.toString = function () {
        return this.pieces.map(function (p) {
            return p.pieceCharCode;
        }).join('');
    };
    return Graveyard;
}());
exports.default = Graveyard;
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
//# sourceMappingURL=Graveyard.js.map