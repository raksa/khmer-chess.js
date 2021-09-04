"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __importDefault(require("../ren/Piece"));
var boardHelper_1 = __importDefault(require("./boardHelper"));
var constant_1 = require("./constant");
var MoveHelper = /** @class */ (function () {
    function MoveHelper() {
    }
    Object.defineProperty(MoveHelper.prototype, "isWhiteTurn", {
        get: function () {
            return Piece_1.default.isWhiteColor(this.currentTurn);
        },
        enumerable: false,
        configurable: true
    });
    MoveHelper.prototype.init = function (option) {
        this.piecesString = option.piecesString;
        this.currentTurn = option.currentTurn;
        this.isQueenMoved = option.isQueenMoved;
        this.isKingMoved = option.isKingMoved;
        this.genCanMove = option.genCanMove;
        this.genCanMoveForAnother = option.genCanMoveForAnother;
        this.whiteMoves = [];
        this.blackMoves = [];
        this.whiteKingInDanger = null;
        this.whiteKingWillInDanger = null;
        this.blackKingInDanger = null;
        this.blackKingWillInDanger = null;
        this.winColor = null;
        this.stuckColor = null;
    };
    MoveHelper.prototype.generateCanMoves = function () {
        var _this = this;
        var filter = boardHelper_1.default.filterPieceInBoard(this.piecesString);
        this.whiteMoves = filter.whitePieces;
        this.blackMoves = filter.blackPieces;
        var genMoves = function (pieceIndices) {
            pieceIndices.forEach(function (pieceIndex) {
                var isHaveMoved = _this.isKingMoved;
                if (pieceIndex.piece !== null) {
                    if (pieceIndex.piece !== null && !pieceIndex.piece.isTypeKing) {
                        isHaveMoved = pieceIndex.piece.isTypeQueen ? _this.isQueenMoved : false;
                    }
                    var canMovePoints = _this.genCanMovePointsByPiecePoint(pieceIndex.point, pieceIndex.piece, _this.piecesString, isHaveMoved);
                    pieceIndex.canMovePoints = canMovePoints;
                }
            });
        };
        genMoves(this.whiteMoves);
        genMoves(this.blackMoves);
    };
    MoveHelper.prototype.cleanPieceNoMove = function () {
        var cleanMoves = function (pieces) {
            var isTrue = true;
            while (isTrue) {
                isTrue = false;
                for (var i = 0; i < pieces.length; i++) {
                    var piece = pieces[i];
                    if (!piece.canMovePoints.length) {
                        pieces.splice(i, 1);
                        isTrue = true;
                        break;
                    }
                }
            }
        };
        cleanMoves(this.whiteMoves);
        cleanMoves(this.blackMoves);
    };
    MoveHelper.prototype.checkIfKingInDanger = function () {
        this.whiteKingInDanger = boardHelper_1.default.getKingInDanger(constant_1.PIECE_COLOR_WHITE, this.piecesString);
        this.whiteKingWillInDanger = boardHelper_1.default.getKingWillInDanger(constant_1.PIECE_COLOR_WHITE, this.piecesString);
        this.blackKingInDanger = boardHelper_1.default.getKingInDanger(constant_1.PIECE_COLOR_BLACK, this.piecesString);
        this.blackKingWillInDanger = boardHelper_1.default.getKingWillInDanger(constant_1.PIECE_COLOR_BLACK, this.piecesString);
    };
    MoveHelper.prototype.genWinLost = function () {
        if (this.whiteKingInDanger && !this.whiteMoves.length) {
            this.winColor = constant_1.PIECE_COLOR_BLACK;
        }
        else if (this.blackKingInDanger && !this.blackMoves.length) {
            this.winColor = constant_1.PIECE_COLOR_WHITE;
        }
    };
    MoveHelper.prototype.getStuck = function () {
        if (this.winColor) {
            return;
        }
        if (this.isWhiteTurn && !this.whiteMoves.length) {
            this.stuckColor = constant_1.PIECE_COLOR_WHITE;
        }
        else if (!this.isWhiteTurn && !this.blackMoves.length) {
            this.stuckColor = constant_1.PIECE_COLOR_BLACK;
        }
    };
    MoveHelper.prototype.calcCanMove = function (option) {
        this.init(option);
        this.generateCanMoves();
        this.cleanPieceNoMove();
        var moves = [];
        if (this.genCanMove) {
            moves = this.isWhiteTurn ? this.whiteMoves : this.blackMoves;
        }
        var anotherMoves = [];
        if (this.genCanMoveForAnother) {
            anotherMoves = !this.isWhiteTurn ? this.whiteMoves : this.blackMoves;
        }
        return {
            moves: moves,
            anotherMoves: anotherMoves,
        };
    };
    MoveHelper.prototype.calcState = function (option) {
        this.init(option);
        this.generateCanMoves();
        this.cleanPieceNoMove();
        this.checkIfKingInDanger();
        this.genWinLost();
        this.getStuck();
        return {
            blackKingInDanger: this.blackKingInDanger,
            whiteKingInDanger: this.whiteKingInDanger,
            blackKingWillInDanger: this.blackKingWillInDanger,
            whiteKingWillInDanger: this.whiteKingWillInDanger,
            winColor: this.winColor,
            stuckColor: this.stuckColor,
        };
    };
    MoveHelper.prototype.calCount = function (_a) {
        var color = _a.color, piecesString = _a.piecesString, force = _a.force;
        return boardHelper_1.default.checkCount(color, piecesString, force);
    };
    MoveHelper.prototype.genCanMovePointsByPiecePoint = function (point, piece, piecesString, isHasMoved) {
        return boardHelper_1.default.genCanMovePointsByPiecePoint(point.index, piece, piecesString, isHasMoved);
    };
    return MoveHelper;
}());
exports.default = MoveHelper;
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
//# sourceMappingURL=MoveHelper.js.map