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
import { PIECE_TYPE_KING } from '../brain/constant';
import { NOT_SET } from './constant';
import Piece from './Piece';

/**
 * King has attacked, this will effect jumping
 */
export default class KAttacked {
    whiteKing = false;
    blackKing = false;
    constructor(kAttackedStr?: string) {
        if (kAttackedStr) {
            this.whiteKing = !!~kAttackedStr.indexOf(Piece.toWhiteCharCode(PIECE_TYPE_KING));
            this.blackKing = !!~kAttackedStr.indexOf(PIECE_TYPE_KING);
        }
    }

    toString() {
        let str = `${this.whiteKing ? Piece.toWhiteCharCode(PIECE_TYPE_KING) : NOT_SET}`;
        str += `${this.blackKing ? PIECE_TYPE_KING : NOT_SET}`;
        return str;
    }
}
