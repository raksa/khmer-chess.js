"use strict";
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
var constant_2 = require("./constant");
var Piece_1 = __importDefault(require("./Piece"));
/**
 * King has attacked, this will effect jumping
 */
var KAttacked = /** @class */ (function () {
    function KAttacked(kAttackedStr) {
        this.whiteKing = false;
        this.blackKing = false;
        if (kAttackedStr) {
            this.whiteKing = !!~kAttackedStr.indexOf(Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_KING));
            this.blackKing = !!~kAttackedStr.indexOf(constant_1.PIECE_TYPE_KING);
        }
    }
    KAttacked.prototype.toString = function () {
        var str = "" + (this.whiteKing ? Piece_1.default.toWhiteCharCode(constant_1.PIECE_TYPE_KING) : constant_2.NOT_SET);
        str += "" + (this.blackKing ? constant_1.PIECE_TYPE_KING : constant_2.NOT_SET);
        return str;
    };
    return KAttacked;
}());
exports.default = KAttacked;
