"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
// 23.-
var CountDown = /** @class */ (function () {
    function CountDown() {
        this.countingDownFromNumber = null;
        this.whiteCountingDownNumber = null;
        this.blackCountingDownNumber = null;
    }
    Object.defineProperty(CountDown.prototype, "isCountDownWhite", {
        get: function () {
            return this.whiteCountingDownNumber !== null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CountDown.prototype, "isCountDownBlack", {
        get: function () {
            return this.blackCountingDownNumber !== null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CountDown.prototype, "isCountingDown", {
        get: function () {
            return this.countingDownFromNumber !== null;
        },
        enumerable: false,
        configurable: true
    });
    CountDown.fromString = function (countdownStr) {
        if (!countdownStr) {
            countdownStr = constant_1.NOT_SET + "." + constant_1.NOT_SET + "@" + constant_1.NOT_SET;
        }
        var countDown = new CountDown();
        var countingDown = countdownStr.split('@');
        if (countingDown[1] !== constant_1.NOT_SET) {
            countDown.countingDownFromNumber = Number(countingDown[1]);
        }
        var countingDownWB = countingDown[0].split('.');
        if (countingDownWB[0] !== constant_1.NOT_SET) {
            countDown.whiteCountingDownNumber = Number(countingDownWB[0]);
        }
        if (countingDownWB[1] !== constant_1.NOT_SET) {
            countDown.blackCountingDownNumber = Number(countingDownWB[1]);
        }
        return countDown;
    };
    CountDown.prototype.toString = function () {
        var str = "" + (this.isCountDownWhite ? this.whiteCountingDownNumber : constant_1.NOT_SET);
        str += "." + (this.isCountDownBlack ? this.blackCountingDownNumber : constant_1.NOT_SET);
        str += "@" + (this.isCountingDown ? this.countingDownFromNumber : constant_1.NOT_SET);
        return str;
    };
    return CountDown;
}());
exports.default = CountDown;
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
//# sourceMappingURL=CountDown.js.map