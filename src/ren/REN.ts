import Board from './Board';
import KqJumped from './KqJumped';
import KAttacked from './KAttacked';
import CountDown from './CountDown';
import Graveyard from './Graveyard';
import {
    DEFAULT_BOARD_STR,
    STRING_COUNT,
} from './constant';
import { Captured } from '../kpgn';
import Move from '../kpgn/Move';
import Point from './Point';
import Piece from './Piece';
import { PieceIndex } from '.';
import MoveHelper from '../brain/MoveHelper';
import { PIECE_COLOR_BLACK, PIECE_COLOR_WHITE } from '../brain/constant';
import jsis from '../brain/jsis';

/**
 * Raksa-Eng Notation
 * ren: <pieces on board> <turn w|b> <king&queen moved ----|SNsn> <king attack --|Kk> <countdown -.-|-.4> <pieces in graveyard>
 */
export type RENPropType = {
    boardStr: string;
    turnStr: string;
    kqJumpedStr: string;
    kAttackedStr: string;
    countdownStr: string;
    graveyardStr: string;
}
export default class REN {
    board: Board;
    turn: string;
    kqJumped: KqJumped;
    kAttacked: KAttacked;
    countdown: CountDown;
    graveyard: Graveyard;
    moveHelper: MoveHelper;
    constructor(renProps: RENPropType) {
        this.moveHelper = new MoveHelper();
        this.init(renProps);
    }

    init({
        boardStr,
        turnStr,
        kqJumpedStr,
        kAttackedStr,
        countdownStr,
        graveyardStr }: RENPropType) {
        // TODO: improve by moving to fromString()
        this.board = new Board(boardStr);
        this.turn = turnStr || PIECE_COLOR_WHITE;
        this.kqJumped = new KqJumped(kqJumpedStr);
        this.kAttacked = new KAttacked(kAttackedStr);
        this.countdown = CountDown.fromString(countdownStr);
        this.graveyard = new Graveyard(graveyardStr);
        const invalidPiecesString = this.isInvalidPieceCount();
        if (invalidPiecesString) {
            let msg = `Invalid piece string board:${boardStr}`;
            msg += `, graveyard:${graveyardStr}, count:${invalidPiecesString}`;
            throw new Error(msg);
        }
        this.moveHelper = new MoveHelper();
    }

    isInvalidPieceCount() {
        const pieces = this.board.pieceIndices.map((pos) => {
            return pos.piece;
        }).filter((p) => {
            return !jsis.isNull(p);
        }).concat(this.graveyard.pieces).map((p) => {
            return p.originPiece;
        });
        const piecesCount = pieces.reduce((obj: any, p) => {
            obj[p.pieceCharCode] = obj[p.pieceCharCode] || 0;
            obj[p.pieceCharCode]++;
            return obj;
        }, {});
        const str = Object.keys(piecesCount).map((k) => {
            return `${k}${piecesCount[k]}`;
        }).sort().join('');
        if (str === STRING_COUNT) {
            return false;
        }
        return str;
    }

    backRen(move: Move) {
        const ren = REN.fromString(this.toString());
        ren.moveBack(move);
        return ren;
    }

    move(moveFromIndex: number, moveToIndex: number): Move | null {
        const piece = this.board.getPieceAtIndex(moveFromIndex);
        if (!piece) {
            return null;
        }
        this.board.setPieceAtIndex(moveFromIndex, null);
        const move = new Move({
            moveFrom: Point.fromIndex(moveFromIndex),
            moveTo: Point.fromIndex(moveToIndex),
            piece: piece.clone(),
        });
        const targetPiece = this.board.getPieceAtIndex(moveToIndex);
        if (targetPiece) {
            this.graveyard.pieces.push(targetPiece);
            move.captured = new Captured({
                fromBoardPoint: Point.fromIndex(moveToIndex),
                toGraveyardPoint: Point.fromIndex(this.graveyard.lastIndex),
                piece: targetPiece,
            });
        }
        this.board.setPieceAtIndex(moveToIndex, piece);
        this.turn = Piece.oppositeColor(piece.color);
        move.setRen(this);
        return move;
    }

    moveBack(move: Move) {
        const movedToIndex = move.moveTo.index;
        const movedFromIndex = move.moveFrom.index;
        const piece = this.board.getPieceAtIndex(movedToIndex);
        this.board.setPieceAtIndex(movedToIndex, null);
        if (!piece) {
            return false;
        }
        this.board.setPieceAtIndex(movedFromIndex, piece);
        if (move.captured) {
            const movedToGYIndex = move.captured.toGraveyardPoint.index;
            const capturedPiece = this.graveyard.get(movedToGYIndex);
            this.board.setPieceAtIndex(movedToIndex, capturedPiece);
            this.graveyard.removeAtIndex(movedToGYIndex);
        }
        if (move.kqJumping.whiteKing) {
            this.kqJumped.whiteKing = false;
        }
        if (move.kqJumping.whiteQueen) {
            this.kqJumped.whiteQueen = false;
        }
        if (move.kqJumping.blackKing) {
            this.kqJumped.blackKing = false;
        }
        if (move.kqJumping.blackQueen) {
            this.kqJumped.blackQueen = false;
        }
        if (move.startCountingFrom) {
            if (move.startCountingFrom === this.countdown.blackCountingDownNumber) {
                this.countdown.blackCountingDownNumber = null;
            } else if (move.startCountingFrom === this.countdown.whiteCountingDownNumber) {
                this.countdown.whiteCountingDownNumber = null;
            }
        }
        this.turn = piece.color;
        return true;
    }

    static fromString(renStr?: string) {
        if (!renStr) {
            renStr = DEFAULT_BOARD_STR;
        }
        const renArr = renStr.split(' ');
        return new REN({
            boardStr: renArr[0],
            turnStr: renArr[1],
            kqJumpedStr: renArr[2],
            kAttackedStr: renArr[3],
            countdownStr: renArr[4],
            graveyardStr: renArr[5],
        });
    }

    toString() {
        let str = this.board.toString();
        str += ` ${this.turn.toString()}`;
        str += ` ${this.kqJumped.toString()}`;
        str += ` ${this.kAttacked.toString()}`;
        str += ` ${this.countdown.toString()}`;
        str += ` ${this.graveyard.toString()}`;
        return str;
    }

    get isQueenMoved() {
        const isQueenMoved = Piece.isWhiteColor(this.turn) && this.kqJumped.whiteQueen ||
            Piece.isBlackColor(this.turn) && this.kqJumped.blackQueen;
        return isQueenMoved;
    }
    get isKingMoved() {
        const isKingMoved = Piece.isWhiteColor(this.turn) && this.kqJumped.whiteKing ||
            Piece.isBlackColor(this.turn) && this.kqJumped.blackKing;
        return isKingMoved;
    }
    genAllCanMoves(): PieceIndex[] {
        const canMoves = this.moveHelper.calcCanMove({
            piecesString: this.board.toStringFullNoSeparate(),
            currentTurn: this.turn,
            isQueenMoved: this.isQueenMoved,
            isKingMoved: this.isKingMoved,
            genCanMove: true,
            genCanMoveForAnother: false,
        });
        return canMoves.moves;
    }
    isHasMoved(piece: Piece) {
        let isHasMoved = false;
        if ((this.kqJumped.blackKing && piece.isColorBlack && piece.isTypeKing) ||
            (this.kqJumped.whiteKing && piece.isColorWhite && piece.isTypeKing) ||
            (this.kqJumped.blackQueen && piece.isColorBlack && piece.isTypeQueen) ||
            (this.kqJumped.whiteQueen && piece.isColorWhite && piece.isTypeQueen)) {
            isHasMoved = true;
        }
        return isHasMoved;
    }
    getCanMovePointsByPoint(point: Point): Point[] {
        const piece = this.board.getPieceAtIndex(point.index);
        if (jsis.isNull(piece)) {
            return [];
        }
        return this.moveHelper.genCanMovePointsByPiecePoint(point, piece,
            this.board.toStringFullNoSeparate(), this.isHasMoved(piece));
    }

    checkBoardStatus(move: Move) {
        // TODO: optimize by specific color
        const state = this.moveHelper.calcState({
            piecesString: this.board.toStringFullNoSeparate(),
            currentTurn: this.turn,
            isQueenMoved: this.isQueenMoved,
            isKingMoved: this.isKingMoved,
            genCanMove: false,
            genCanMoveForAnother: false,
        });
        const force = false; // // force: true => weaker color has 2 pieces but force to cal count
        if (!this.countdown.isCountingDown && (state.blackCountable || state.whiteCountable)) {
            const countState = this.moveHelper.calCount({
                color: state.whiteCountable ? PIECE_COLOR_WHITE : PIECE_COLOR_BLACK,
                piecesString: this.board.toStringFullNoSeparate(),
                force,
            });
            // TODO: start counting
            console.log(countState);
        }

        const kingInDanger = state.blackKingInDanger || state.whiteKingInDanger;
        if (kingInDanger) {
            const pieceIndex = kingInDanger.map((point) => {
                return new PieceIndex(point, this.board.getPieceAtIndex(point.index));
            }).filter((pieceIndex) => {
                return !pieceIndex.piece.isTypeKing;
            })[0];
            move.boardStatus.attacker = pieceIndex;
        }
        move.boardStatus.winColor = state.winColor;
        move.boardStatus.stuckColor = state.stuckColor;
        // TODO: drawCountColor
    }
    getWinColor(): string | null {
        const state = this.moveHelper.calcState({
            piecesString: this.board.toStringFullNoSeparate(),
            currentTurn: this.turn,
            isQueenMoved: this.isQueenMoved,
            isKingMoved: this.isKingMoved,
            genCanMove: false,
            genCanMoveForAnother: false,
        });
        return state.winColor;
    }
}
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