import { PIECE_COLOR_BLACK, PIECE_COLOR_WHITE } from '../brain';
import { NOT_SET } from './constant';

// 23.-
export default class CountUp {
    countingToNumber: number | null = null;
    countingNumber: number | null = null;
    isCountingUp = false;
    color: string | null = null;

    get isWhite() {
        return this.color === PIECE_COLOR_WHITE;
    }
    get isBlack() {
        return this.color === PIECE_COLOR_BLACK;
    }
    get isWhiteCounting() {
        return this.isCounting && this.isWhite;
    }
    get isBlackCounting() {
        return this.isCounting && !this.isWhite;
    }
    get isCounting() {
        return this.countingToNumber !== null;
    }
    get isCountingOut() {
        return this.isCounting && this.countingNumber >= this.countingToNumber;
    }

    set(color: string, countingToNumber: number, countingNumber: number) {
        this.color = color;
        this.countingToNumber = countingToNumber;
        this.countingNumber = countingNumber;
    }

    clear() {
        this.color = null;
        this.countingToNumber = null;
        this.countingNumber = null;
    }

    checkUp(color: string) {
        if (color === this.color) {
            this.countingNumber++;
            this.isCountingUp = true;
        } else {
            this.isCountingUp = false;
        }
    }

    static fromString(countUpStr: string) {
        if (!countUpStr) {
            countUpStr = `${NOT_SET}.${NOT_SET}@${NOT_SET}`;
        }
        const countUp = new CountUp();
        const countingUp = countUpStr.split('@');
        if (countingUp[1] !== NOT_SET) {
            countUp.countingToNumber = Number(countingUp[1]);
        }
        const countingUpWB = countingUp[0].split('.');
        if (countingUpWB[0] !== NOT_SET) {
            countUp.color = PIECE_COLOR_WHITE;
            countUp.countingNumber = Number(countingUpWB[0]);
        }
        if (countingUpWB[1] !== NOT_SET) {
            countUp.color = PIECE_COLOR_BLACK;
            countUp.countingNumber = Number(countingUpWB[1]);
        }
        return countUp;
    }

    toString() {
        const whiteCountingDow = this.isCounting && this.isWhite ? this.countingNumber : NOT_SET;
        const blackCountingDow = this.isCounting && !this.isWhite ? this.countingNumber : NOT_SET;
        let str = `${whiteCountingDow}`;
        str += `.${blackCountingDow}`;
        str += `@${this.isCounting ? this.countingToNumber : NOT_SET}`;
        return str;
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