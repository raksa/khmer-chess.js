import jsis from './jsis';
import genMask from './genMask';
import {
    PIECE_COLOR_WHITE,
    PIECE_COLOR_BLACK,
    EMPTY_PIECE,
    ROW_NUMBER,
    PIECE_TYPE_FISH,
    PIECE_TYPE_BOAT,
    PIECE_TYPE_GENERAL,
    PIECE_TYPE_HORSE,
    PIECE_TYPE_KING,
    CELL_COUNT,
} from './constant';
import Point from '../ren/Point';
import Piece from '../ren/Piece';
import Rectangle from './Rectangle';
import { PieceIndex } from '../ren';

const mask = genMask();

export class CountUpState {
    countingToNumber: number;
    countingNumber: number;
    constructor(countingNumber: number, countingToNumber: number) {
        this.countingNumber = countingNumber;
        this.countingToNumber = countingToNumber;
    }
}

class BoardHelper {
    getCharPieceFromString(piecesString: string, index: number) {
        if (Point.isIndexInBoard(index) && piecesString.length === CELL_COUNT) {
            return piecesString[index];
        }
        return EMPTY_PIECE;
    }
    getCharPieceInPos(index: number, piecesString: string) {
        return this.getCharPieceFromString(piecesString, index);
    }
    getPieceByIndex(index: number, piecesString: string): {
        isValidPiece: boolean, piece: Piece | null
    } {
        const charCode = this.getCharPieceInPos(index, piecesString);
        return {
            isValidPiece: Piece.isValidPiece(charCode),
            piece: Piece.fromCharCode(charCode),
        };
    }
    convertMask = (point1: Point, index: number, color: string) => {
        const sign = Piece.isWhiteColor(color) ? 1 : -1;
        const point2 = Point.fromIndex(index);
        point1.x = point1.x * sign + point2.x;
        point1.y = point1.y * sign + point2.y;
        return Rectangle.isValidPoint(point1) ? point1.index : null;
    };
    getPieceCanMovePoses(index: number, piece: Piece) {
        const pieceIndices: number[] = [];
        mask[piece.type].forEach((_pos: number[]) => {
            const newIndex = this.convertMask(new Point(_pos[0], _pos[1]), index, piece.color);
            if (newIndex !== null) {
                pieceIndices.push(newIndex);
            }
        });
        return pieceIndices;
    }
    getPieceCanMovePosesValid(index: number, piece: Piece, piecesString: string) {
        const _poses = this.getPieceCanMovePoses(index, piece);
        const pieceIndices: number[] = [];
        const n = _poses.length;
        const thisPos = Point.fromIndex(index);
        for (let i = 0; i < n; i++) {
            let p: Point | null = Point.fromIndex(_poses[i]);
            const distPiece = this.getPieceByIndex(p.index, piecesString);
            if (distPiece.isValidPiece) {
                if (distPiece.piece && piece.color === distPiece.piece.color ||
                    (piece.isTypeFish && p.x === thisPos.x)) {
                    p = null;
                }
            } else {
                if (piece.isTypeFish && p.x !== thisPos.x) {
                    p = null;
                }
            }
            if (p !== null && piece.isTypeBoat) {
                const _x = thisPos.x;
                const _y = thisPos.y;
                if (p.x === thisPos.x) {
                    let _n = Math.abs(p.y - thisPos.y);
                    const _s = thisPos.y < p.y ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceByIndex(Point.xyToIndex(_x, _y + _s * _n), piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                } else if (p.y === thisPos.y) {
                    let _n = Math.abs(p.x - thisPos.x);
                    const _s = thisPos.x < p.x ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceByIndex(Point.xyToIndex(_x + _s * _n, _y), piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                }
            }
            if (!jsis.isNull(p)) {
                pieceIndices.push(_poses[i]);
            }
        }
        return pieceIndices;
    }
    replacePiecesStringAtIndex(piecesString: string, charCode: string, index: number) {
        return piecesString.substring(0, index) + charCode + piecesString.substring(index + 1);
    }
    injectPiece(piecesString: string, index1: number, index2: number) {
        const c = piecesString[index1];
        if (!this.isCharPiecesInBoard(c, piecesString)) {
            return null;
        }
        piecesString = this.replacePiecesStringAtIndex(piecesString, EMPTY_PIECE, index1);
        piecesString = this.replacePiecesStringAtIndex(piecesString, c, index2);
        return piecesString;
    }
    getKingWillInDanger(color: string, piecesString: string) {
        const kingPos = piecesString.indexOf(new Piece(PIECE_TYPE_KING, color).pieceCharCode);
        const n = piecesString.length;
        for (let i = 0; i < n; i++) {
            const p = this.getPieceByIndex(i, piecesString);
            if (p.piece !== null && p.isValidPiece && p.piece.color !== color &&
                p.piece.isTypeBoat) {
                const _poses = this.getPieceCanMovePoses(i, p.piece);
                for (let j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [Point.fromIndex(i), Point.fromIndex(kingPos)];
                    }
                }
            }
        }
        return null;
    }
    getKingInDanger(color: string, piecesString: string): Point[] | null {
        const kingPos = piecesString.indexOf(new Piece(PIECE_TYPE_KING, color).pieceCharCode);
        const n = piecesString.length;
        for (let i = 0; i < n; i++) {
            const p = this.getPieceByIndex(i, piecesString);
            if (p.piece !== null && p.isValidPiece && p.piece.color !== color) {
                const _poses = this.getPieceCanMovePosesValid(i, p.piece, piecesString);
                for (let j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [Point.fromIndex(i), Point.fromIndex(kingPos)];
                    }
                }
            }
        }
        return null;
    }
    genCanMovePointsByPiecePoint(index: number, piece: Piece,
        piecesString: string, isHasMoved?: boolean) {
        const _poses = this.getPieceCanMovePosesValid(index, piece, piecesString);
        const isHaveCaptured = this.isHaveCaptured(piecesString);
        if (piece.isTypeKing) {
            if (!isHaveCaptured && !isHasMoved) {
                let p = this.convertMask(new Point(2, 1), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
                p = this.convertMask(new Point(-2, 1), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        } else if (piece.isTypeQueen) {
            if (!isHaveCaptured && !isHasMoved) {
                const p = this.convertMask(new Point(-0, 2), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        const n = _poses.length;
        const points: Point[] = [];
        for (let i = 0; i < n; i++) {
            const str = this.injectPiece(piecesString, index, _poses[i]);
            if (str !== null && this.getKingInDanger(piece.color, str) === null) {
                points.push(Point.fromIndex(_poses[i]));
            }
        }
        return points;
    }
    isCharPiecesInBoard(code: string, piecesString: string) {
        return !!~piecesString.indexOf(code);
    }
    getPiecesInBoard(piecesString: string) {
        return piecesString.split('').filter((charCode: string) => {
            return Piece.isValidPiece(charCode);
        });
    }
    isHaveCaptured(piecesString: string) {
        return this.getPiecesInBoard(piecesString).length < ROW_NUMBER * 4;
    }
    filterPieceInBoard(piecesString: string) {
        const whitePieces: PieceIndex[] = [];
        const blackPieces: PieceIndex[] = [];
        for (let i = 0; i < piecesString.length; i++) {
            const charCode = piecesString[i];
            if (Piece.isValidPiece(charCode)) {
                const pieceIndex = new PieceIndex(Point.fromIndex(i), Piece.fromCharCode(charCode));
                if (pieceIndex.piece !== null && pieceIndex.piece.isColorWhite) {
                    whitePieces.push(pieceIndex);
                } else {
                    blackPieces.push(pieceIndex);
                }
            }
        }
        return {
            whitePieces,
            blackPieces,
        };
    }
    extractPiecesToArray(piecesString: string) {
        const piecesStringArr = piecesString.split('');
        const pieceAll: { [key: string]: string[] } = {
            [PIECE_COLOR_BLACK]: [],
            [PIECE_COLOR_WHITE]: [],
        };
        piecesStringArr.forEach((charCode: string) => {
            if (charCode === EMPTY_PIECE) {
                return;
            }
            const piece = Piece.fromCharCode(charCode);
            if (piece) {
                pieceAll[piece.color].push(piece.type);
            }
        });
        return pieceAll;
    }
    isStateCount(c: string, piecesString: string) {
        const allPieces = this.extractPiecesToArray(piecesString);
        return allPieces[c].length === 1;
    }
    checkCountable(color: string, piecesString: string) {
        const pieceAll = this.extractPiecesToArray(piecesString);
        const weaker = pieceAll[color];
        const stronger = pieceAll[Piece.oppositeColor(color)];
        return weaker.length <= 2 && stronger.length >= 2;
    }
    checkCount(color: string, piecesString: string, force: boolean): CountUpState | null {
        const countChar = (str: string[], c: string) => {
            return str.join('').split(c).length - 1;
        };
        const charExist = (str: string[], c: string) => {
            return !!~str.indexOf(c);
        };

        const pieceAll = this.extractPiecesToArray(piecesString);
        const weaker = pieceAll[color];
        const stronger = pieceAll[Piece.oppositeColor(color)];
        if (weaker.length === 1 && stronger.length > 1) {
            if (!charExist(stronger, PIECE_TYPE_FISH)) {
                let count = 64;
                const toukCount = countChar(stronger, PIECE_TYPE_BOAT);
                if (toukCount) {
                    count = toukCount > 1 ? 8 : 16;
                } else if (countChar(stronger, PIECE_TYPE_GENERAL) > 1) {
                    count = 22;
                } else if (countChar(stronger, PIECE_TYPE_HORSE) > 1) {
                    count = 32;
                } else if (countChar(stronger, PIECE_TYPE_GENERAL)) {
                    count = 44;
                }
                // FIXME: when touk 2 and stronger.length > 8 => start > count
                let start = stronger.length;
                if (start > 4) {
                    start = 4;
                }
                return new CountUpState(start, count);
            }
            return new CountUpState(0, 64);
        } else if (force && this.checkCountable(color, piecesString)) {
            return new CountUpState(0, 64);
        }
        return null;
    }
    isUpgradable(piece: Piece, point: Point) {
        if (piece.isTypeFish) {
            if (piece.isColorBlack && point.y <= 2) {
                return true;
            }
            if (piece.isColorWhite && point.y >= 5) {
                return true;
            }
        }
        return false;
    }
};

export default new BoardHelper();
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