"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2021-2022, K4us
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
var package_json_1 = __importDefault(require("../package.json"));
var constant_1 = require("./brain/constant");
var KPGN_1 = __importDefault(require("./kpgn/KPGN"));
var table_1 = __importDefault(require("./other/table"));
var REN_1 = __importDefault(require("./ren/REN"));
var KhmerChess = /** @class */ (function () {
    function KhmerChess(renStr) {
        var ren = REN_1.default.fromString(renStr);
        this.kpgn = new KPGN_1.default(ren);
    }
    KhmerChess.prototype.loadKpng = function (option) {
        this.kpgn.fromJson(option);
    };
    KhmerChess.prototype.resetBoard = function () {
        this.kpgn.ren = REN_1.default.fromString();
    };
    KhmerChess.prototype.getCanMoves = function () {
        var pieceIndices = this.kpgn.ren.genAllCanMoves();
        return pieceIndices;
    };
    KhmerChess.prototype.getCanMovePointsByPoint = function (point) {
        var canMovePoints = this.kpgn.ren.getCanMovePointsByPoint(point);
        return canMovePoints;
    };
    KhmerChess.prototype.validateRENStr = function (renStr) {
        try {
            REN_1.default.fromString(renStr);
            return { valid: true, error_number: 0, error: 'No errors.' };
        }
        catch (error) {
            return {
                valid: false,
                error_number: 1,
                error: error.message,
            };
        }
    };
    KhmerChess.prototype.getRENStr = function () {
        return this.kpgn.ren.toString();
    };
    Object.defineProperty(KhmerChess.prototype, "piecesInBoardMultiArray", {
        get: function () {
            return this.kpgn.ren.board.piecesMultiArray;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KhmerChess.prototype, "piecesInBoard", {
        get: function () {
            return this.kpgn.ren.board.pieces;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KhmerChess.prototype, "piecesInGraveyard", {
        get: function () {
            return this.kpgn.ren.graveyard.pieces;
        },
        enumerable: false,
        configurable: true
    });
    // Khmer Portable Game Notation <file-name>.kpgn.json
    KhmerChess.prototype.getKPGN = function () {
        return this.kpgn.toJson();
    };
    KhmerChess.prototype.loadKpgn = function (kpgnJosn, options) {
        this.kpgn = new KPGN_1.default(this.kpgn.ren);
    };
    KhmerChess.prototype.drawAscii = function () {
        return (0, table_1.default)(this.kpgn.ren);
    };
    Object.defineProperty(KhmerChess.prototype, "turn", {
        get: function () {
            return this.kpgn.ren.turn;
        },
        set: function (turn) {
            this.kpgn.ren.turn = turn;
        },
        enumerable: false,
        configurable: true
    });
    KhmerChess.prototype.move = function (moveFromIndex, moveToIndex) {
        var move = this.kpgn.ren.move(moveFromIndex, moveToIndex);
        this.kpgn.addMove(move);
        return move;
    };
    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    KhmerChess.prototype.clearBoard = function () {
        this.kpgn.ren = REN_1.default.fromString('4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB');
    };
    KhmerChess.prototype.getHistories = function () {
        return this.kpgn.moves;
    };
    KhmerChess.toKhmerNum = function (englishNum) {
        var str = "" + englishNum;
        var result = str.split('').map(function (c) {
            return constant_1.VERTICAL_NOTE_LETTERS[constant_1.VERTICAL_NOTE_LETTERS_ENGLISH.indexOf(c)];
        }).join('');
        return result;
    };
    KhmerChess.title = package_json_1.default.name;
    KhmerChess.version = package_json_1.default.version;
    return KhmerChess;
}());
exports.default = KhmerChess;
//# sourceMappingURL=KhmerChess.js.map