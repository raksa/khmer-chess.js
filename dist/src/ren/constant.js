"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_FLAG_COUNT_UP_OUT = exports.EVENT_FLAG_COUNTING_UP = exports.EVENT_FLAG_START_COUNTING = exports.EVENT_FLAG_DRAW = exports.EVENT_FLAG_WIN = exports.EVENT_FLAG_ATTACK = exports.PIECE_FLAG_START_COUNTING = exports.PIECE_FLAG_UPGRADE = exports.PIECE_FLAG_JUMP = exports.PIECE_FLAG_KILL = exports.NOT_SET = exports.DEFAULT_BOARD_STR = exports.STRING_COUNT = void 0;
// BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb w ---- -- -.-
exports.STRING_COUNT = 'B2F8G2H2K1Q1b2f8g2h2k1q1';
// BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb w ---- -- -.-
exports.DEFAULT_BOARD_STR = 'BHGKQGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgqkghb';
exports.NOT_SET = '-';
exports.PIECE_FLAG_KILL = 'x'; // TODO: <
exports.PIECE_FLAG_JUMP = 'j'; // TODO: ^
exports.PIECE_FLAG_UPGRADE = 'u'; // TODO: *
exports.PIECE_FLAG_START_COUNTING = 'z'; // TODO: #
exports.EVENT_FLAG_ATTACK = 'attack';
exports.EVENT_FLAG_WIN = 'win';
exports.EVENT_FLAG_DRAW = 'draw';
exports.EVENT_FLAG_START_COUNTING = 'start-counting';
exports.EVENT_FLAG_COUNTING_UP = 'counting-up';
exports.EVENT_FLAG_COUNT_UP_OUT = 'count-up-out';
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
//# sourceMappingURL=constant.js.map