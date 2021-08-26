"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../brain/constant");
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Point.prototype, "index", {
        get: function () {
            return Point.xyToIndex(this.x, this.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "graveyardIndex", {
        get: function () {
            return this.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "indexCode", {
        get: function () {
            return "" + this.h + this.v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "title", {
        get: function () {
            return "" + constant_1.HORIZONTAL_NOTE_LETTERS[this.x] + constant_1.VERTICAL_NOTE_LETTERS[this.y];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "titleEnglish", {
        get: function () {
            return this.indexCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "h", {
        get: function () {
            return constant_1.HORIZONTAL_CODE_LETTERS[this.x];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "v", {
        get: function () {
            return this.y + 1;
        },
        enumerable: false,
        configurable: true
    });
    Point.xyToIndex = function (x, y) {
        return y * constant_1.ROW_NUMBER + x;
    };
    Point.indexCodeToXY = function (indexCode) {
        var x = constant_1.HORIZONTAL_CODE_LETTERS.indexOf(indexCode[0]);
        var y = Number(indexCode[1]) - 1;
        return { x: x, y: y };
    };
    Point.indexCodeToIndex = function (indexCode) {
        var _a = Point.indexCodeToXY(indexCode), x = _a.x, y = _a.y;
        return Point.xyToIndex(x, y);
    };
    Point.fromIndexCode = function (indexCode) {
        var _a = Point.indexCodeToXY(indexCode), x = _a.x, y = _a.y;
        return new Point(x, y);
    };
    Point.indexToXY = function (index) {
        var x = index % constant_1.ROW_NUMBER;
        var y = Math.floor(index / constant_1.ROW_NUMBER);
        return { x: x, y: y };
    };
    Point.fromIndex = function (index) {
        var _a = Point.indexToXY(index), x = _a.x, y = _a.y;
        return new Point(x, y);
    };
    Point.fromIndexGraveyardIndex = function (index) {
        return new Point(index, 0);
    };
    Point.isIndexInBoard = function (index) {
        return index >= 0 && index <= constant_1.CELL_COUNT - 1;
    };
    return Point;
}());
exports.default = Point;
