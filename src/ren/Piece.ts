import {
    PIECE_COLOR_BLACK,
    PIECE_COLOR_WHITE,
    PIECE_TYPE_TRANSFORM_FISH,
    PIECE_TYPE_FISH,
    PIECE_TYPE_BOAT,
    PIECE_TYPE_HORSE,
    PIECE_TYPE_GENERAL,
    PIECE_TYPE_KING,
    PIECE_TYPE_QUEEN,
    EMPTY_PIECE,
    BOARD_SEPARATOR,
    PIECE_NAMES,
    COLOR_NAMES,
    PIECE_NAMES_ENGLISH,
    COLOR_NAMES_ENGLISH,
} from '../brain/constant';
import jsis from '../brain/jsis';

export default class Piece {
    type: string;
    color: string;
    get colorOpponent() {
        return Piece.oppositeColor(this.color);
    }
    get pieceCharCode() {
        if (this.isColorWhite) {
            return this.pieceCharCodeWhite;
        }
        return this.type;
    }
    get pieceCharCodeWhite() {
        return Piece.toWhiteCharCode(this.type);
    }

    get title() {
        return `${PIECE_NAMES[this.type]}${COLOR_NAMES[this.color]}`;
    }
    get titleEnglish() {
        return `${COLOR_NAMES_ENGLISH[this.color]}-${PIECE_NAMES_ENGLISH[this.type]}`;
    }
    _isTypeEqual(type: string) {
        return this.type === type;
    }
    get isTypeKing() {
        return this._isTypeEqual(PIECE_TYPE_KING);
    }
    get isTypeQueen() {
        return this._isTypeEqual(PIECE_TYPE_QUEEN);
    }
    get isTypeBoat() {
        return this._isTypeEqual(PIECE_TYPE_BOAT);
    }
    get isTypeHorse() {
        return this._isTypeEqual(PIECE_TYPE_HORSE);
    }
    get isTypeGeneral() {
        return this._isTypeEqual(PIECE_TYPE_GENERAL);
    }
    get isTypeFish() {
        return this._isTypeEqual(PIECE_TYPE_FISH);
    }
    get isTypeTransformedFish() {
        return this._isTypeEqual(PIECE_TYPE_TRANSFORM_FISH);
    }
    get isColorBlack() {
        return Piece.isBlackColor(this.color);
    }
    get isColorWhite() {
        return Piece.isWhiteColor(this.color);
    }


    constructor(type: string, color: string) {
        this.type = Piece.toNormalCharCode(type);
        this.color = color;
    }

    static fromCharCode(charCode: string) {
        if (!Piece.isValidPiece(charCode)) {
            return null;
        }
        const color = Piece.isWhiteCharCode(charCode) ? PIECE_COLOR_WHITE : PIECE_COLOR_BLACK;
        const type = Piece.toNormalCharCode(charCode);
        return new Piece(type, color);
    }

    get originPiece(): Piece {
        if (this.isTypeTransformedFish) {
            return new Piece(PIECE_TYPE_FISH, this.color);
        }
        return this;
    }

    static get pieceChars() {
        return [
            PIECE_TYPE_BOAT,
            PIECE_TYPE_HORSE,
            PIECE_TYPE_GENERAL,
            PIECE_TYPE_KING,
            PIECE_TYPE_QUEEN,
            PIECE_TYPE_FISH,
            PIECE_TYPE_TRANSFORM_FISH,
        ];
    }
    static get colorChars() {
        return [
            PIECE_COLOR_WHITE,
            PIECE_COLOR_BLACK,
        ];
    }


    static toWhiteCharCode(charCode: string) {
        return charCode.toUpperCase();
    }
    static isWhiteCharCode(charCode: string) {
        return jsis.isUpperCase(charCode);
    }
    static toBlackCharCode(charCode: string) {
        return charCode.toLowerCase();
    }
    static toNormalCharCode(charCode: string) {
        return Piece.toBlackCharCode(charCode);
    }

    static isValidPiece(charCode: string) {
        return charCode !== EMPTY_PIECE;
    }
    static isWhiteColor(color: string) {
        return color === PIECE_COLOR_WHITE;
    }
    static isBlackColor(color: string) {
        return color === PIECE_COLOR_BLACK;
    }
    static oppositeColor(color: any) {
        return Piece.isWhiteColor(color) ? PIECE_COLOR_BLACK : PIECE_COLOR_WHITE;
    }

    static isValidPiecesString(str: string, onlyPiece?: boolean) {
        const ruler = onlyPiece ? allPiecesString.filter((c: string) => {
            return !~[EMPTY_PIECE, BOARD_SEPARATOR].indexOf(c);
        }) : allPiecesString;
        return !str.split('').some((c: string) => {
            return !~ruler.indexOf(c);
        });
    }

    upgrade() {
        if (this.isTypeFish) {
            this.type = PIECE_TYPE_TRANSFORM_FISH;
            return true;
        }
        return false;
    }
    downgrade() {
        if (this.isTypeTransformedFish) {
            this.type = PIECE_TYPE_FISH;
            return true;
        }
        return false;
    }
    clone() {
        return Piece.fromCharCode(this.pieceCharCode);
    }
}

const allPiecesString: string[] = [
    ...Piece.pieceChars,
    ...Piece.pieceChars.map((pieceChar: string) => {
        return Piece.toWhiteCharCode(pieceChar);
    }),
    EMPTY_PIECE,
    BOARD_SEPARATOR,
];
/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>, K4us Net <k4us.net@gmail.com>
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