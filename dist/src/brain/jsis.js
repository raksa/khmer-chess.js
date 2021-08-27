"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsis = {
    isValid: function (v) {
        return !this.isNull(v) && !this.isUndefined(v);
    },
    isNull: function (v) {
        return v === null;
    },
    isUndefined: function (v) {
        return typeof v === 'undefined';
    },
    isString: function (str) {
        return this.isValid(str) && typeof str === 'string';
    },
    isNotEmpty: function (str) {
        // eslint-disable-next-line eqeqeq
        return this.isValidString(str) && str != '';
    },
    isNumber: function (n) {
        return this.isValid(n) && typeof n === 'number';
    },
    isStringNumber: function (n) {
        // eslint-disable-next-line eqeqeq
        return this.isString(n) && n != '' && !isNaN(Number(n));
    },
    isArray: function (arr) {
        return this.isValid(arr) && arr instanceof Array;
    },
    isFunction: function (f) {
        return this.isValid(f) && typeof f === 'function';
    },
    isObject: function (o) {
        return this.isValid(o) && o instanceof Object;
    },
    isBoolean: function (b) {
        return this.isValid(b) && typeof b === 'boolean';
    },
    isTrue: function (b) {
        return this.isValidBoolean(b) && b;
    },
    isFalse: function (b) {
        return this.isValidBoolean(b) && !b;
    },
    isPoint: function (p) {
        var isPoint = this.isValid(p) &&
            this.isValidObject(p) &&
            this.isValidNumber(p.x) &&
            this.isValidNumber(p.y);
        return isPoint;
    },
    isSize: function (size) {
        var isSize = this.isValid(size) &&
            this.isValidObject(size) &&
            this.isValidNumber(size.width) &&
            this.isValidNumber(size.height);
        return isSize;
    },
    isOdd: function (n) {
        return !!(n % 2);
    },
    isEven: function (n) {
        return !this.isOdd(n);
    },
    isUpperCase: function (str) {
        return str === str.toUpperCase();
    },
};
exports.default = jsis;
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
//# sourceMappingURL=jsis.js.map