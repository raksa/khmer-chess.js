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
import { PIECE_TYPE_KING, PIECE_TYPE_QUEEN } from '../brain/constant';
import { Move } from '../kpgn';
import { NOT_SET } from './constant';
import Piece from './Piece';

/**
 * King or Queen has jumped, the will effect jumping
 */
export default class KqJumped {
    whiteKing = false;
    whiteQueen = false;
    blackKing = false;
    blackQueen = false;
    keyCodes: { [key: string]: string } = {
        blackKing: Piece.toWhiteCharCode(PIECE_TYPE_QUEEN),
        whiteKing: Piece.toWhiteCharCode(PIECE_TYPE_KING),
        whiteQueen: PIECE_TYPE_KING,
        blackQueen: PIECE_TYPE_QUEEN,
    };
    codeKeys: { [key: string]: string } = {
        [Piece.toWhiteCharCode(PIECE_TYPE_QUEEN)]: 'blackKing: ',
        [Piece.toWhiteCharCode(PIECE_TYPE_KING)]: 'whiteKing: ',
        [PIECE_TYPE_KING]: 'whiteQueen: ',
        [PIECE_TYPE_QUEEN]: 'blackQueen: ',
    };
    constructor(kqJumpedStr?: string) {
        if (kqJumpedStr) {
            this.whiteKing = !!~kqJumpedStr.indexOf(Piece.toWhiteCharCode(PIECE_TYPE_KING));
            this.whiteQueen = !!~kqJumpedStr.indexOf(Piece.toWhiteCharCode(PIECE_TYPE_QUEEN));
            this.blackKing = !!~kqJumpedStr.indexOf(PIECE_TYPE_KING);
            this.blackQueen = !!~kqJumpedStr.indexOf(PIECE_TYPE_QUEEN);
        }
    }

    get isJumped() {
        return this.whiteKing || this.whiteQueen || this.blackKing || this.blackQueen;
    }

    setProp(key: string, value: boolean) {
        (this as any)[key] = value;
    }
    applyJumping(propKey: string, move: Move) {
        if (!(this as any)[propKey]) {
            move.kqJumping.setProp(propKey, true);
            this.setProp(propKey, true);
        }
    }

    checkKQMoved(move: Move) {
        if (move.attacker || move.captured) {
            this.applyJumping('whiteKing', move);
            this.applyJumping('blackKing', move);
            this.applyJumping('whiteQueen', move);
            this.applyJumping('blackQueen', move);
        }
        const piece = move.piece;
        if (piece.isTypeKing) {
            if (piece.isColorWhite) {
                this.applyJumping('whiteKing', move);
            } else {
                this.applyJumping('blackKing', move);
            }
        } else if (piece.isTypeQueen) {
            if (piece.isColorWhite) {
                this.applyJumping('whiteQueen', move);
            } else {
                this.applyJumping('blackQueen', move);
            }
        }
    }

    toString() {
        let str = `${this.whiteKing ? Piece.toWhiteCharCode(PIECE_TYPE_KING) : NOT_SET}`;
        str += `${this.whiteQueen ? Piece.toWhiteCharCode(PIECE_TYPE_QUEEN) : NOT_SET}`;
        str += `${this.blackKing ? PIECE_TYPE_KING : NOT_SET}`;
        str += `${this.blackQueen ? PIECE_TYPE_QUEEN : NOT_SET}`;
        return str;
    }

    toNumber() {
        let str = `${this.whiteKing ? 1 : 0}`;
        str += `${this.whiteQueen ? 1 : 0}`;
        str += `${this.blackKing ? 1 : 0}`;
        str += `${this.blackQueen ? 1 : 0}`;
        return parseInt(str, 2);
    }
    public static fromNumber(n: number) {
        const b = ('0000' + Number(n).toString(2)).substr(-4);
        const kqJumped = new KqJumped();
        kqJumped.whiteKing = b[0] === '1';
        kqJumped.whiteQueen = b[1] === '1';
        kqJumped.blackKing = b[2] === '1';
        kqJumped.blackQueen = b[3] === '1';
        return kqJumped;
    }
}
