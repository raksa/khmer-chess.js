"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = exports.REN = exports.PieceIndex = exports.Piece = exports.KqMoved = exports.KAttacked = exports.Graveyard = exports.CountDown = exports.Board = void 0;
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
var Board_1 = require("./Board");
Object.defineProperty(exports, "Board", { enumerable: true, get: function () { return __importDefault(Board_1).default; } });
var CountDown_1 = require("./CountDown");
Object.defineProperty(exports, "CountDown", { enumerable: true, get: function () { return __importDefault(CountDown_1).default; } });
var Graveyard_1 = require("./Graveyard");
Object.defineProperty(exports, "Graveyard", { enumerable: true, get: function () { return __importDefault(Graveyard_1).default; } });
var KAttacked_1 = require("./KAttacked");
Object.defineProperty(exports, "KAttacked", { enumerable: true, get: function () { return __importDefault(KAttacked_1).default; } });
var KqMoved_1 = require("./KqMoved");
Object.defineProperty(exports, "KqMoved", { enumerable: true, get: function () { return __importDefault(KqMoved_1).default; } });
var Piece_1 = require("./Piece");
Object.defineProperty(exports, "Piece", { enumerable: true, get: function () { return __importDefault(Piece_1).default; } });
var PieceIndex_1 = require("./PieceIndex");
Object.defineProperty(exports, "PieceIndex", { enumerable: true, get: function () { return __importDefault(PieceIndex_1).default; } });
var REN_1 = require("./REN");
Object.defineProperty(exports, "REN", { enumerable: true, get: function () { return __importDefault(REN_1).default; } });
var Point_1 = require("./Point");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return __importDefault(Point_1).default; } });
__exportStar(require("./constant"), exports);
