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
import Piece from '../ren/Piece';
import PieceIndex from '../ren/PieceIndex';
import Point from '../ren/Point';
import boardHelper from './boardHelper';
import { PIECE_COLOR_BLACK, PIECE_COLOR_WHITE } from './constant';
// abcdecbaooooooooffffffffoooooooooooooooommmmmmmmoooooooohijlkjih
export type OptionsType = {
    piecesString: string;
    currentTurn: string;
    isQueenMoved: boolean;
    isKingMoved: boolean;
    genCanMove: boolean;
    genCanMoveForAnother: boolean;
};
export type CalCountPropsType = {
    color: string,
    piecesString: string;
    force: boolean;
};
export default class MoveHelper implements OptionsType {
    piecesString: string = '';
    currentTurn: string = '';
    isQueenMoved: boolean = false;
    isKingMoved: boolean = false;
    genCanMove: boolean = false;
    genCanMoveForAnother: boolean = false;

    whiteMoves: PieceIndex[] = [];
    blackMoves: PieceIndex[] = [];
    whiteKingInDanger: Point[] | null = null;
    whiteKingWillInDanger: Point[] | null = null;
    blackKingInDanger: Point[] | null = null;
    blackKingWillInDanger: Point[] | null = null;
    winColor: string | null = null;
    stuckColor: string | null = null;

    get isWhiteTurn() {
        return Piece.isWhiteColor(this.currentTurn);
    }
    init(option: OptionsType) {
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
    }

    generateCanMoves() {
        const filter = boardHelper.filterPieceInBoard(this.piecesString);
        this.whiteMoves = filter.whitePieces;
        this.blackMoves = filter.blackPieces;
        const genMoves = (pieceIndices: PieceIndex[]) => {
            pieceIndices.forEach((pieceIndex) => {
                let isHaveMoved = this.isKingMoved;
                if (pieceIndex.piece !== null) {
                    if (pieceIndex.piece !== null && !pieceIndex.piece.isTypeKing) {
                        isHaveMoved = pieceIndex.piece.isTypeQueen ? this.isQueenMoved : false;
                    }
                    const canMovePoints = this.genCanMovePointsByPiecePoint(
                        pieceIndex.point,
                        pieceIndex.piece,
                        this.piecesString,
                        isHaveMoved
                    );
                    pieceIndex.canMovePoints = canMovePoints;
                }
            });
        };
        genMoves(this.whiteMoves);
        genMoves(this.blackMoves);
    }

    cleanPieceNoMove() {
        const cleanMoves = (pieces: any[]) => {
            let isTrue = true;
            while (isTrue) {
                isTrue = false;
                for (let i = 0; i < pieces.length; i++) {
                    const piece = pieces[i];
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
    }

    checkIfKingInDanger() {
        this.whiteKingInDanger = boardHelper.getKingInDanger(
            PIECE_COLOR_WHITE,
            this.piecesString
        );
        this.whiteKingWillInDanger = boardHelper.getKingWillInDanger(
            PIECE_COLOR_WHITE,
            this.piecesString
        );
        this.blackKingInDanger = boardHelper.getKingInDanger(
            PIECE_COLOR_BLACK,
            this.piecesString
        );
        this.blackKingWillInDanger = boardHelper.getKingWillInDanger(
            PIECE_COLOR_BLACK,
            this.piecesString
        );
    }

    genWinLost() {
        if (this.whiteKingInDanger && !this.whiteMoves.length) {
            this.winColor = PIECE_COLOR_BLACK;
        } else if (this.blackKingInDanger && !this.blackMoves.length) {
            this.winColor = PIECE_COLOR_WHITE;
        }
    }

    getStuck() {
        if (this.winColor) {
            return;
        }
        if (this.isWhiteTurn && !this.whiteMoves.length) {
            this.stuckColor = PIECE_COLOR_WHITE;
        } else if (!this.isWhiteTurn && !this.blackMoves.length) {
            this.stuckColor = PIECE_COLOR_BLACK;
        }
    }

    calcCanMove(option: OptionsType) {
        this.init(option);
        this.generateCanMoves();
        this.cleanPieceNoMove();
        let moves: PieceIndex[] = [];
        if (this.genCanMove) {
            moves = this.isWhiteTurn ? this.whiteMoves : this.blackMoves;
        }
        let anotherMoves: PieceIndex[] = [];
        if (this.genCanMoveForAnother) {
            anotherMoves = !this.isWhiteTurn ? this.whiteMoves : this.blackMoves;
        }
        return {
            moves,
            anotherMoves,
        };
    }

    calcState(option: OptionsType) {
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
    }

    calCount({ color, piecesString, force }: CalCountPropsType) {
        return boardHelper.checkCount(color, piecesString, force);
    }

    genCanMovePointsByPiecePoint(point: Point, piece: Piece,
        piecesString: string, isHasMoved?: boolean) {
        return boardHelper.genCanMovePointsByPiecePoint(
            point.index,
            piece,
            piecesString,
            isHasMoved
        );
    }
}
