"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
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
var jsis_1 = __importDefault(require("../brain/jsis"));
var constant_1 = require("./constant");
// 23.-
var CountDown = /** @class */ (function () {
    function CountDown(countdownStr) {
        if (countdownStr === void 0) { countdownStr = ''; }
        this.white = null;
        this.black = null;
        var newCountdownStr = countdownStr.split('.');
        this.white = jsis_1.default.isStringNumber(newCountdownStr[0]) ? Number(newCountdownStr[0]) : null;
        this.black = jsis_1.default.isStringNumber(newCountdownStr[1]) ? Number(newCountdownStr[1]) : null;
        if (!jsis_1.default.isNull(this.white) && !jsis_1.default.isNull(this.white)) {
            throw new Error("Invalid countdown string " + countdownStr);
        }
    }
    CountDown.prototype.toString = function () {
        var str = "" + (jsis_1.default.isNull(this.white) ? constant_1.NOT_SET : this.white);
        str += "." + (jsis_1.default.isNull(this.black) ? constant_1.NOT_SET : this.black);
        return str;
    };
    return CountDown;
}());
exports.default = CountDown;
