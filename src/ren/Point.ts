
import {
    CELL_COUNT,
    HORIZONTAL_CODE_LETTERS,
    HORIZONTAL_NOTE_LETTERS,
    ROW_NUMBER,
    VERTICAL_NOTE_LETTERS,
} from '../brain/constant';

export default class Point {
    x: number;
    y: number;
    get index() {
        return Point.xyToIndex(this.x, this.y);
    }
    get graveyardIndex() {
        return this.x;
    }
    get indexCode() {
        return `${this.h}${this.v}`;
    }
    get title() {
        return `${HORIZONTAL_NOTE_LETTERS[this.x]}${VERTICAL_NOTE_LETTERS[this.y]}`;
    }
    get titleEnglish() {
        return this.indexCode;
    }
    get h() {
        return HORIZONTAL_CODE_LETTERS[this.x];
    }
    get v() {
        return this.y + 1;
    }
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    static xyToIndex(x: number, y: number) {
        return y * ROW_NUMBER + x;
    }
    static indexCodeToXY(indexCode: string) {
        const x = HORIZONTAL_CODE_LETTERS.indexOf(indexCode[0]);
        const y = Number(indexCode[1]) - 1;
        return { x, y };
    }
    static indexCodeToIndex(indexCode: string) {
        const { x, y } = Point.indexCodeToXY(indexCode);
        return Point.xyToIndex(x, y);
    }
    static fromIndexCode(indexCode: string) {
        const { x, y } = Point.indexCodeToXY(indexCode);
        return new Point(x, y);
    }
    static indexToXY(index: number) {
        const x = index % ROW_NUMBER;
        const y = Math.floor(index / ROW_NUMBER);
        return { x, y };
    }
    static fromIndex(index: number) {
        const { x, y } = Point.indexToXY(index);
        return new Point(x, y);
    }
    static fromIndexGraveyardIndex(index: number) {
        return new Point(index, 0);
    }
    static isIndexInBoard(index: number) {
        return index >= 0 && index <= CELL_COUNT - 1;
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