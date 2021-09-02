"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = __importDefault(require("./Board"));
var KqJumped_1 = __importDefault(require("./KqJumped"));
var KAttacked_1 = __importDefault(require("./KAttacked"));
var CountDown_1 = __importDefault(require("./CountDown"));
var Graveyard_1 = __importDefault(require("./Graveyard"));
var constant_1 = require("./constant");
var kpgn_1 = require("../kpgn");
var Move_1 = __importDefault(require("../kpgn/Move"));
var Point_1 = __importDefault(require("./Point"));
var Piece_1 = __importDefault(require("./Piece"));
var _1 = require(".");
var MoveHelper_1 = __importDefault(require("../brain/MoveHelper"));
var constant_2 = require("../brain/constant");
var jsis_1 = __importDefault(require("../brain/jsis"));
var REN = /** @class */ (function () {
    function REN(renProps) {
        this.moveHelper = new MoveHelper_1.default();
        this.init(renProps);
    }
    REN.prototype.init = function (_a) {
        var boardStr = _a.boardStr, turnStr = _a.turnStr, kqJumpedStr = _a.kqJumpedStr, kAttackedStr = _a.kAttackedStr, countdownStr = _a.countdownStr, graveyardStr = _a.graveyardStr;
        this.board = new Board_1.default(boardStr);
        this.turn = turnStr || constant_2.PIECE_COLOR_WHITE;
        this.kqJumped = new KqJumped_1.default(kqJumpedStr);
        this.kAttacked = new KAttacked_1.default(kAttackedStr);
        this.countdown = new CountDown_1.default(countdownStr);
        this.graveyard = new Graveyard_1.default(graveyardStr);
        var invalidPiecesString = this.isInvalidPieceCount();
        if (invalidPiecesString) {
            var msg = "Invalid piece string board:" + boardStr;
            msg += ", graveyard:" + graveyardStr + ", count:" + invalidPiecesString;
            throw new Error(msg);
        }
        this.moveHelper = new MoveHelper_1.default();
    };
    REN.prototype.isInvalidPieceCount = function () {
        var pieces = this.board.pieceIndices.map(function (pos) {
            return pos.piece;
        }).filter(function (p) {
            return !jsis_1.default.isNull(p);
        }).concat(this.graveyard.pieces).map(function (p) {
            return p.originPiece;
        });
        var piecesCount = pieces.reduce(function (obj, p) {
            obj[p.pieceCharCode] = obj[p.pieceCharCode] || 0;
            obj[p.pieceCharCode]++;
            return obj;
        }, {});
        var str = Object.keys(piecesCount).map(function (k) {
            return "" + k + piecesCount[k];
        }).sort().join('');
        if (str === constant_1.STRING_COUNT) {
            return false;
        }
        return str;
    };
    REN.prototype.backRen = function (move) {
        var ren = REN.fromString(this.toString());
        ren.moveBack(move);
        return ren;
    };
    REN.fromString = function (renStr) {
        if (!renStr) {
            renStr = constant_1.DEFAULT_BOARD_STR;
        }
        var renArr = renStr.split(' ');
        return new REN({
            boardStr: renArr[0],
            turnStr: renArr[1],
            kqJumpedStr: renArr[2],
            kAttackedStr: renArr[3],
            countdownStr: renArr[4],
            graveyardStr: renArr[5],
        });
    };
    REN.prototype.move = function (moveFromIndex, moveToIndex) {
        var piece = this.board.getPieceAtIndex(moveFromIndex);
        if (!piece) {
            return null;
        }
        this.board.setPieceAtIndex(moveFromIndex, null);
        var move = new Move_1.default({
            moveFrom: Point_1.default.fromIndex(moveFromIndex),
            moveTo: Point_1.default.fromIndex(moveToIndex),
            piece: piece.clone(),
        });
        var targetPiece = this.board.getPieceAtIndex(moveToIndex);
        if (targetPiece) {
            this.graveyard.pieces.push(targetPiece);
            move.captured = new kpgn_1.Captured({
                fromBoardPoint: Point_1.default.fromIndex(moveToIndex),
                toGraveyardPoint: Point_1.default.fromIndex(this.graveyard.lastIndex),
                piece: targetPiece,
            });
        }
        this.board.setPieceAtIndex(moveToIndex, piece);
        this.turn = Piece_1.default.oppositeColor(piece.color);
        move.setRen(this);
        return move;
    };
    REN.prototype.moveBack = function (move) {
        var movedToIndex = move.moveTo.index;
        var movedFromIndex = move.moveFrom.index;
        var piece = this.board.getPieceAtIndex(movedToIndex);
        this.board.setPieceAtIndex(movedToIndex, null);
        if (!piece) {
            return false;
        }
        this.board.setPieceAtIndex(movedFromIndex, piece);
        if (move.captured) {
            var movedToGYIndex = move.captured.toGraveyardPoint.index;
            var capturedPiece = this.graveyard.get(movedToGYIndex);
            this.board.setPieceAtIndex(movedToIndex, capturedPiece);
            this.graveyard.removeAtIndex(movedToGYIndex);
        }
        for (var k in move.jumpingCodes) {
            this.kqJumped.unJumped(k);
        }
        this.turn = piece.color;
        return true;
    };
    REN.prototype.toString = function () {
        var str = this.board.toString();
        str += " " + this.turn.toString();
        str += " " + this.kqJumped.toString();
        str += " " + this.kAttacked.toString();
        str += " " + this.countdown.toString();
        str += " " + this.graveyard.toString();
        return str;
    };
    Object.defineProperty(REN.prototype, "isQueenMoved", {
        get: function () {
            var isQueenMoved = Piece_1.default.isWhiteColor(this.turn) && this.kqJumped.whiteQueen ||
                Piece_1.default.isBlackColor(this.turn) && this.kqJumped.blackQueen;
            return isQueenMoved;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(REN.prototype, "isKingMoved", {
        get: function () {
            var isKingMoved = Piece_1.default.isWhiteColor(this.turn) && this.kqJumped.whiteKing ||
                Piece_1.default.isBlackColor(this.turn) && this.kqJumped.blackKing;
            return isKingMoved;
        },
        enumerable: false,
        configurable: true
    });
    REN.prototype.genAllCanMoves = function () {
        var canMoves = this.moveHelper.calcCanMove({
            piecesString: this.board.toStringFullNoSeparate(),
            currentTurn: this.turn,
            isQueenMoved: this.isQueenMoved,
            isKingMoved: this.isKingMoved,
            genCanMove: true,
            genCanMoveForAnother: false,
        });
        return canMoves.moves;
    };
    REN.prototype.isHasMoved = function (piece) {
        var isHasMoved = false;
        if ((this.kqJumped.blackKing && piece.isColorBlack && piece.isTypeKing) ||
            (this.kqJumped.whiteKing && piece.isColorWhite && piece.isTypeKing) ||
            (this.kqJumped.blackQueen && piece.isColorBlack && piece.isTypeQueen) ||
            (this.kqJumped.whiteQueen && piece.isColorWhite && piece.isTypeQueen)) {
            isHasMoved = true;
        }
        return isHasMoved;
    };
    REN.prototype.getCanMovePointsByPoint = function (point) {
        var piece = this.board.getPieceAtIndex(point.index);
        if (jsis_1.default.isNull(piece)) {
            return [];
        }
        return this.moveHelper.genCanMovePointsByPiecePoint(point, piece, this.board.toStringFullNoSeparate(), this.isHasMoved(piece));
    };
    REN.prototype.getAttacker = function () {
        var _this = this;
        var state = this.moveHelper.calcState({
            piecesString: this.board.toStringFullNoSeparate(),
            currentTurn: this.turn,
            isQueenMoved: this.isQueenMoved,
            isKingMoved: this.isKingMoved,
            genCanMove: false,
            genCanMoveForAnother: false,
        });
        var kingInDanger = state.blackKingInDanger || state.whiteKingInDanger;
        if (kingInDanger) {
            var pieceIndex = kingInDanger.map(function (point) {
                return new _1.PieceIndex(point, _this.board.getPieceAtIndex(point.index));
            }).filter(function (pieceIndex) {
                return !pieceIndex.piece.isTypeKing;
            })[0];
            return pieceIndex;
        }
        return null;
    };
    REN.prototype.getWinColor = function () {
        var state = this.moveHelper.calcState({
            piecesString: this.board.toStringFullNoSeparate(),
            currentTurn: this.turn,
            isQueenMoved: this.isQueenMoved,
            isKingMoved: this.isKingMoved,
            genCanMove: false,
            genCanMoveForAnother: false,
        });
        return state.winColor;
    };
    return REN;
}());
exports.default = REN;
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
//# sourceMappingURL=REN.js.map