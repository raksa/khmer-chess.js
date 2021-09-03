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
exports.MoveHelper = exports.HVPont = exports.jsis = exports.genMask = exports.boardHelper = exports.Rectangle = void 0;
var Rectangle_1 = require("./Rectangle");
Object.defineProperty(exports, "Rectangle", { enumerable: true, get: function () { return __importDefault(Rectangle_1).default; } });
var boardHelper_1 = require("./boardHelper");
Object.defineProperty(exports, "boardHelper", { enumerable: true, get: function () { return __importDefault(boardHelper_1).default; } });
var genMask_1 = require("./genMask");
Object.defineProperty(exports, "genMask", { enumerable: true, get: function () { return __importDefault(genMask_1).default; } });
var jsis_1 = require("./jsis");
Object.defineProperty(exports, "jsis", { enumerable: true, get: function () { return __importDefault(jsis_1).default; } });
var HVPont_1 = require("./HVPont");
Object.defineProperty(exports, "HVPont", { enumerable: true, get: function () { return __importDefault(HVPont_1).default; } });
var MoveHelper_1 = require("./MoveHelper");
Object.defineProperty(exports, "MoveHelper", { enumerable: true, get: function () { return __importDefault(MoveHelper_1).default; } });
__exportStar(require("./constant"), exports);
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
//# sourceMappingURL=index.js.map