import { NOT_SET } from './constant';

// 23.-
export default class CountDown {
    countingDownFromNumber: number | null = null;
    whiteCountingDownNumber: number | null = null;
    blackCountingDownNumber: number | null = null;

    get isCountDownWhite() {
        return this.whiteCountingDownNumber !== null;
    }
    get isCountDownBlack() {
        return this.blackCountingDownNumber !== null;
    }

    get isCountingDown() {
        return this.countingDownFromNumber !== null;
    }

    static fromString(countdownStr: string) {
        if (!countdownStr) {
            countdownStr = `${NOT_SET}.${NOT_SET}@${NOT_SET}`;
        }
        const countDown = new CountDown();
        const countingDown = countdownStr.split('@');
        if (countingDown[1] !== NOT_SET) {
            countDown.countingDownFromNumber = Number(countingDown[1]);
        }
        const countingDownWB = countingDown[0].split('.');
        if (countingDownWB[0] !== NOT_SET) {
            countDown.whiteCountingDownNumber = Number(countingDownWB[0]);
        }
        if (countingDownWB[1] !== NOT_SET) {
            countDown.blackCountingDownNumber = Number(countingDownWB[1]);
        }
        return countDown;
    }

    toString() {
        let str = `${this.isCountDownWhite ? this.whiteCountingDownNumber : NOT_SET}`;
        str += `.${this.isCountDownBlack ? this.blackCountingDownNumber : NOT_SET}`;
        str += `@${this.isCountingDown ? this.countingDownFromNumber : NOT_SET}`;
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