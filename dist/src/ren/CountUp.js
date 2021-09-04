"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var brain_1 = require("../brain");
var constant_1 = require("./constant");
// 23.-
var CountUp = /** @class */ (function () {
    function CountUp() {
        this.countingToNumber = null;
        this.countingNumber = null;
        this.isCountingUp = false;
        this.color = null;
    }
    Object.defineProperty(CountUp.prototype, "isWhite", {
        get: function () {
            return this.color === brain_1.PIECE_COLOR_WHITE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CountUp.prototype, "isBlack", {
        get: function () {
            return this.color === brain_1.PIECE_COLOR_BLACK;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CountUp.prototype, "isWhiteCounting", {
        get: function () {
            return this.isCounting && this.isWhite;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CountUp.prototype, "isBlackCounting", {
        get: function () {
            return this.isCounting && !this.isWhite;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CountUp.prototype, "isCounting", {
        get: function () {
            return this.countingToNumber !== null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CountUp.prototype, "isCountingOut", {
        get: function () {
            return this.isCounting && this.countingNumber >= this.countingToNumber;
        },
        enumerable: false,
        configurable: true
    });
    CountUp.prototype.set = function (color, countingToNumber, countingNumber) {
        this.color = color;
        this.countingToNumber = countingToNumber;
        this.countingNumber = countingNumber;
    };
    CountUp.prototype.clear = function () {
        this.color = null;
        this.countingToNumber = null;
        this.countingNumber = null;
    };
    CountUp.prototype.checkUp = function (color) {
        if (color === this.color) {
            this.countingNumber++;
            this.isCountingUp = true;
        }
        else {
            this.isCountingUp = false;
        }
    };
    CountUp.fromString = function (countUpStr) {
        if (!countUpStr) {
            countUpStr = constant_1.NOT_SET + "." + constant_1.NOT_SET + "@" + constant_1.NOT_SET;
        }
        var countUp = new CountUp();
        var countingUp = countUpStr.split('@');
        if (countingUp[1] !== constant_1.NOT_SET) {
            countUp.countingToNumber = Number(countingUp[1]);
        }
        var countingUpWB = countingUp[0].split('.');
        if (countingUpWB[0] !== constant_1.NOT_SET) {
            countUp.color = brain_1.PIECE_COLOR_WHITE;
            countUp.countingNumber = Number(countingUpWB[0]);
        }
        if (countingUpWB[1] !== constant_1.NOT_SET) {
            countUp.color = brain_1.PIECE_COLOR_BLACK;
            countUp.countingNumber = Number(countingUpWB[1]);
        }
        return countUp;
    };
    CountUp.prototype.toString = function () {
        var whiteCountingDow = this.isCounting && this.isWhite ? this.countingNumber : constant_1.NOT_SET;
        var blackCountingDow = this.isCounting && !this.isWhite ? this.countingNumber : constant_1.NOT_SET;
        var str = "" + whiteCountingDow;
        str += "." + blackCountingDow;
        str += "@" + (this.isCounting ? this.countingToNumber : constant_1.NOT_SET);
        return str;
    };
    return CountUp;
}());
exports.default = CountUp;
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
//# sourceMappingURL=CountUp.js.map