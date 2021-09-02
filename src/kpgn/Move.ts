
import { boardHelper, PIECE_TYPE_KING, PIECE_TYPE_QUEEN } from '../brain';
import { PieceIndex, REN } from '../ren';
import {
    PIECE_FLAG_JUMP,
    PIECE_FLAG_KILL,
    PIECE_FLAG_UPGRADE,
} from '../ren/constant';
import Piece from '../ren/Piece';
import Point from '../ren/Point';
import Captured from './Captured';

export type Option = {
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isUpgrading?: boolean;
    captured?: Captured;
};
export default class Move {
    renStr: string;
    boardStatus: {
        attacker?: PieceIndex,
        winColor?: string,
        stuckColor?: string,
        drawCountColor?: string,
    } = {};
    jumpingCodes: { [key: string]: boolean } = {};
    piece: Piece;
    moveFrom: Point;
    moveTo: Point;
    isUpgrading: boolean;
    captured: Captured | null;
    constructor({ piece, moveFrom, moveTo,
        isUpgrading, captured,
    }: Option) {
        this.piece = piece;
        this.moveFrom = moveFrom;
        this.moveTo = moveTo;
        this.isUpgrading = !!isUpgrading;
        this.captured = captured || null;
        if (boardHelper.isUpgradable(piece, moveTo)) {
            this.isUpgrading = true;
            piece.upgrade();
        }
    }

    setRen(ren: REN) {
        // TODO: preload stuck, draw
        this.boardStatus.attacker = ren.getAttacker();
        if (this.boardStatus.attacker) {
            this.boardStatus.winColor = ren.getWinColor();
        }
        ren.kqJumped.checkKQMoved(this);
        this.renStr = ren.toString();
    }

    get isWhiteKingJumping() {
        return !!this.jumpingCodes[Piece.toWhiteCharCode(PIECE_TYPE_KING)];
    }
    get isWhiteQueenJumping() {
        return !!this.jumpingCodes[Piece.toWhiteCharCode(PIECE_TYPE_QUEEN)];
    }
    get isBlackKingJumping() {
        return !!this.jumpingCodes[PIECE_TYPE_KING];
    }
    get isBlackQueenJumping() {
        return !!this.jumpingCodes[PIECE_TYPE_QUEEN];
    }

    get attacker() {
        return this.boardStatus.attacker || null;
    }

    get winColor() {
        return this.boardStatus.winColor || null;
    }

    get stuckColor() {
        return this.boardStatus.stuckColor || null;
    }

    get drawCountColor() {
        return this.boardStatus.drawCountColor || null;
    }

    get isDraw() {
        return this.stuckColor || this.drawCountColor;
    }

    get isGameOver() {
        return this.winColor || this.isDraw;
    }

    static fromMovedString(str: string, ren: REN) {
        const piece = Piece.fromCharCode(str[0]);
        const moveFrom = Point.fromIndexCode(str.substr(1, 2));
        const moveTo = Point.fromIndexCode(str.substr(3, 2));
        const move = new Move({
            piece,
            moveFrom,
            moveTo,
        });
        const killIndex = str.indexOf(PIECE_FLAG_KILL);
        if (!!~killIndex) {
            const gyIndex = Number(str.substr(killIndex + 1).match(/^(\d+)/)[1]);
            const capturedPiece = ren.graveyard.get(gyIndex);
            if (!capturedPiece) {
                throw new Error('Invalid captured index');
            }
            move.captured = new Captured({
                fromBoardPoint: moveTo,
                toGraveyardPoint: Point.fromIndexGraveyardIndex(gyIndex),
                piece: capturedPiece,
            });

        }
        const jumpingIndex = str.indexOf(PIECE_FLAG_JUMP);
        if (!!~jumpingIndex) {
            const jumpingCodes = str.substr(jumpingIndex + 1).match(/^\[(\w+)\]/)[1];
            jumpingCodes.split('').forEach((c) => {
                move.jumpingCodes[c] = true;
            });
        }
        move.setRen(ren);
        return move;
    }
    toString() {
        const pCode = this.piece.pieceCharCode;
        const fIndexCode = this.moveFrom.indexCode;
        const tIndexCode = this.moveTo.indexCode;
        let flags = '';
        if (this.captured) {
            flags += PIECE_FLAG_KILL + this.captured.toGraveyardPoint.index;

        }
        const jumpingCodes = Object.keys(this.jumpingCodes).join('');
        if (jumpingCodes.length) {
            flags += PIECE_FLAG_JUMP + `[${jumpingCodes}]`;
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
            jumpingCodes: Object.keys(this.jumpingCodes).join(''),
            capturedPiece: this.captured ? this.captured.piece.pieceCharCode : null,
        };
    }

    getJumpingMessage(isEnglish?: boolean) {
        let jump = '';
        if (isEnglish) {
            if (this.isWhiteKingJumping) {
                jump += ' white king jumping';
            }
            if (this.isWhiteQueenJumping) {
                jump += ' white queen jumping';
            }
            if (this.isBlackKingJumping) {
                jump += ' black king jumping';
            }
            if (this.isBlackQueenJumping) {
                jump += ' black queen jumping';
            }
        } else {
            if (this.isWhiteKingJumping) {
                jump += ' ស្តេច​ស​ភ្លោះ';
            }
            if (this.isWhiteQueenJumping) {
                jump += ' នាង​ស​ភ្លោះ';
            }
            if (this.isBlackKingJumping) {
                jump += ' ស្តេច​ខ្មៅ​ភ្លោះ';
            }
            if (this.isBlackQueenJumping) {
                jump += ' នាង​ខ្មៅ​ភ្លោះ';
            }
        }
        return jump;
    }
    getMessage(isEnglish?: boolean) {
        if (isEnglish) {
            let captured = '';
            if (this.captured) {
                captured = ` captures ${this.captured.piece.titleEnglish}`;
            }
            const upgrade = this.isUpgrading ? ' transforms' : '';
            const jump = this.getJumpingMessage(isEnglish);
            return `${this.piece.titleEnglish} moved from ${this.moveFrom.titleEnglish} to ${this.moveTo.titleEnglish}${upgrade}${captured} ${jump}`;
        } else {
            let captured = '';
            if (this.captured) {
                captured = ` ស៊ី${this.captured.piece.title}`;
            }
            const upgrade = this.isUpgrading ? ' បក' : '';
            const jump = this.getJumpingMessage(isEnglish);
            return `${this.piece.title} ដើរ​ពី ${this.moveFrom.title} ទៅ ${this.moveTo.title}${upgrade}${captured} ${jump}`;
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