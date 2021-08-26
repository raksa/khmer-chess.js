
import { boardHelper, PIECE_TYPE_TRANSFORM_FISH } from '../brain';
import {
    PIECE_FLAG_JUMP,
    PIECE_FLAG_KILL,
    PIECE_FLAG_UPGRADE,
} from '../ren/constant';
import Piece from '../ren/Piece';
import Point from '../ren/Point';
import Captured from './Captured';

export type MovePropType = {
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isJumping?: boolean; // King or Queen would jump on first start
    isUpgrading?: boolean;
    captured?: Captured;
};
export default class Move implements MovePropType {
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isJumping?: boolean;
    isUpgrading?: boolean;
    captured?: Captured;
    constructor({ piece, moveFrom, moveTo, isJumping,
        isUpgrading, captured,
    }: MovePropType) {
        this.piece = piece;
        this.moveFrom = moveFrom;
        this.moveTo = moveTo;
        this.isJumping = !!isJumping;
        this.isUpgrading = !!isUpgrading;
        this.captured = captured || null;
        if (boardHelper.isUpgradable(piece, moveTo)) {
            this.isUpgrading = true;
            piece.type = PIECE_TYPE_TRANSFORM_FISH;
        }
    }

    // Spec: Fc5d6xf => White fish (F) moved from c5 to d6 killed black fish (f)
    static fromMovedString(graveyardLastIndex: number) {
        // const str = 'Fc5d6j';
        const str = 'Fc5d6xf';
        const piece = Piece.fromCharCode(str[0]);
        const moveFrom = Point.fromIndexCode(str.substr(1, 2));
        const moveTo = Point.fromIndexCode(str.substr(3, 2));
        const move = new Move({
            piece,
            moveFrom,
            moveTo,
        });
        if (str[5] === PIECE_FLAG_KILL) {
            const capturedPieceChar = str[6];
            move.captured = new Captured({
                fromBoardPoint: moveTo,
                toGraveyardPoint: Point.fromIndexGraveyardIndex(graveyardLastIndex),
                piece: Piece.fromCharCode(capturedPieceChar),
            });
        } else if (str[5] === PIECE_FLAG_JUMP) {
            move.isJumping = true;
        }
        return move;
    }
    // Fc5d6j: jump, Fc5d6x: kill, Fc5d6xt: kill&upgrade
    toString() {
        const pCode = this.piece.pieceCharCode;
        const fIndexCode = this.moveFrom.indexCode;
        const tIndexCode = this.moveTo.indexCode;
        let flags = this.captured ? PIECE_FLAG_KILL : '';
        if (this.isJumping) {
            flags += PIECE_FLAG_JUMP;
        }
        if (this.isUpgrading) {
            flags += PIECE_FLAG_UPGRADE;
        }
        return `${pCode}${fIndexCode}${tIndexCode}${flags}`;
    }

    toJson() {
        return {
            fromIndex: this.moveFrom.index,
            toIndex: this.moveTo.index,
            isJumping: this.isJumping,
            capturedPiece: this.captured ? this.captured.piece.pieceCharCode : null,
        };
    }

    getMessage(isEnglish?: boolean) {
        if (isEnglish) {
            let captured = '';
            if (this.captured) {
                captured = ` captures ${this.captured.piece.titleEnglish}`;
            }
            const upgrade = this.isUpgrading ? ' transforms' : '';
            return `${this.piece.titleEnglish} moved from ${this.moveFrom.titleEnglish} to ${this.moveTo.titleEnglish}${upgrade}${captured}`;
        } else {
            let captured = '';
            if (this.captured) {
                captured = ` ស៊ី${this.captured.piece.title}`;
            }
            const upgrade = this.isUpgrading ? ' បក' : '';
            return `${this.piece.title} ដើរ​ពី ${this.moveFrom.title} ទៅ ${this.moveTo.title}${upgrade}${captured}`;
        }
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