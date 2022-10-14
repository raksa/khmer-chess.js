import Piece from './Piece';
import PieceIndex from './PieceIndex';
import { DEFAULT_BOARD_STR } from './constant';
import { BOARD_SEPARATOR, CELL_COUNT, EMPTY_PIECE, ROW_NUMBER } from '../brain/constant';
import Point from './Point';

/**
 * BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb => bhgqkghb/......../ffffffff/......../......../FFFFFFFF/......../BHGKQGHB
 */

export default class Board {
    pieceIndices = Array.from({
        length: CELL_COUNT,
    }, (_, i) => {
        const point = Point.fromIndex(i);
        return new PieceIndex(point, null);
    });

    constructor(boardStr?: string) {
        if (!boardStr) {
            boardStr = DEFAULT_BOARD_STR;
        }
        const newBoardStr = this.extract(boardStr).replace(/\//g, '');
        if (newBoardStr.length < CELL_COUNT ||
            !Piece.isValidPiecesString(newBoardStr)) {
            throw new Error(`Invalid board string ${boardStr}`);
        }
        this.pieceIndices = newBoardStr.split('').map((charCode: string, i: number) => {
            const point = Point.fromIndex(i);
            return new PieceIndex(point, charCode === EMPTY_PIECE ? null : Piece.fromCharCode(charCode));
        });
    }

    get piecesMultiArray() {
        const arr: (Piece | null)[][] = [[], [], [], [], [], [], [], []];
        this.pieceIndices.forEach((pieceIndex) => {
            arr[pieceIndex.point.y][pieceIndex.point.x] = pieceIndex.piece;
        });
        return arr;
    }

    get pieces() {
        return this.pieceIndices.map((pieceIndex) => {
            return pieceIndex.piece;
        });
    }

    get whiteKing() {
        return this.pieceIndices.find((pieceIndex) => {
            return pieceIndex.piece && pieceIndex.piece.isTypeKing && pieceIndex.piece.isColorWhite;
        });
    }

    get blackKing() {
        return this.pieceIndices.find((pieceIndex) => {
            return pieceIndex.piece && pieceIndex.piece.isTypeKing && pieceIndex.piece.isColorBlack;
        });
    }

    getKing(color: string) {
        return Piece.isWhiteColor(color) ? this.whiteKing : this.blackKing;
    }

    compress(str: string) {
        const reg = new RegExp(`(\\${EMPTY_PIECE}+)`, 'g');
        return str.replace(reg, ($1: any) => $1.length);
    }

    extract(str: string) {
        return str.replace(/(\d+)/g, ($1: any) => {
            // $1 == 3 => '...', bh6 => 'bh......'
            return Array.from({
                length: $1,
            }, () => EMPTY_PIECE).join('');
        });
    }

    toStringFull(pieceIndices: PieceIndex[] = this.pieceIndices) {
        const str = pieceIndices.map((pieceIndex, i) => {
            const p = pieceIndex.toPieceCharCode();
            if (i && i % ROW_NUMBER === 0 && i !== CELL_COUNT) {
                return `${BOARD_SEPARATOR}${p}`;
            }
            return p;
        }).join('');
        return str;
    }
    toStringFullNoSeparate() {
        let str = this.toStringFull();
        str = str.replace(/\//g, '');
        return str;
    }

    toString(pieceIndices?: PieceIndex[]) {
        let str = this.toStringFull(pieceIndices);
        str = this.compress(str);
        return str;
    }

    getPieceAtIndex(index: number): Piece | null {
        return this.pieceIndices[index].piece;
    }

    setPieceAtIndex(index: number, piece: Piece | null) {
        this.pieceIndices[index].piece = piece;
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