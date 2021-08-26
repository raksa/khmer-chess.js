"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERTICAL_NOTE_LETTERS_ENGLISH = exports.HORIZONTAL_NOTE_LETTERS_ENGLISH = exports.VERTICAL_NOTE_LETTERS = exports.HORIZONTAL_NOTE_LETTERS = exports.HORIZONTAL_CODE_LETTERS = exports.CELL_COUNT = exports.ROW_LAST_INDEX = exports.ROW_FIRST_INDEX = exports.ROW_NUMBER = exports.BOARD_SEPARATOR = exports.PIECE_COLOR_EMPTY = exports.EMPTY_PIECE = exports.PIECE_NAMES_ENGLISH = exports.PIECE_NAMES = exports.PIECE_TYPE_TRANSFORM_FISH = exports.PIECE_TYPE_FISH = exports.PIECE_TYPE_QUEEN = exports.PIECE_TYPE_KING = exports.PIECE_TYPE_GENERAL = exports.PIECE_TYPE_HORSE = exports.PIECE_TYPE_BOAT = exports.COLOR_NAMES_ENGLISH = exports.COLOR_NAMES = exports.PIECE_COLOR_BLACK = exports.PIECE_COLOR_WHITE = void 0;
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
exports.PIECE_COLOR_WHITE = 'w';
exports.PIECE_COLOR_BLACK = 'b';
exports.COLOR_NAMES = (_a = {},
    _a[exports.PIECE_COLOR_BLACK] = 'ខ្មៅ',
    _a[exports.PIECE_COLOR_WHITE] = 'ស',
    _a);
exports.COLOR_NAMES_ENGLISH = (_b = {},
    _b[exports.PIECE_COLOR_BLACK] = 'black',
    _b[exports.PIECE_COLOR_WHITE] = 'white',
    _b);
exports.PIECE_TYPE_BOAT = 'b'; // Boat
exports.PIECE_TYPE_HORSE = 'h'; // Horse
exports.PIECE_TYPE_GENERAL = 'g'; // General
exports.PIECE_TYPE_KING = 'k'; // King
exports.PIECE_TYPE_QUEEN = 'q'; // Queen
exports.PIECE_TYPE_FISH = 'f'; // Fish
exports.PIECE_TYPE_TRANSFORM_FISH = 't'; // Transform fish
exports.PIECE_NAMES = (_c = {},
    _c[exports.PIECE_TYPE_BOAT] = 'ទូក',
    _c[exports.PIECE_TYPE_HORSE] = 'សេះ',
    _c[exports.PIECE_TYPE_GENERAL] = 'គោល',
    _c[exports.PIECE_TYPE_KING] = 'ស្តេច',
    _c[exports.PIECE_TYPE_QUEEN] = 'នាង',
    _c[exports.PIECE_TYPE_FISH] = 'ត្រី',
    _c[exports.PIECE_TYPE_TRANSFORM_FISH] = 'ត្រីបក',
    _c);
exports.PIECE_NAMES_ENGLISH = (_d = {},
    _d[exports.PIECE_TYPE_BOAT] = 'boat',
    _d[exports.PIECE_TYPE_HORSE] = 'horse',
    _d[exports.PIECE_TYPE_GENERAL] = 'general',
    _d[exports.PIECE_TYPE_KING] = 'king',
    _d[exports.PIECE_TYPE_QUEEN] = 'queen',
    _d[exports.PIECE_TYPE_FISH] = 'fish',
    _d[exports.PIECE_TYPE_TRANSFORM_FISH] = 'transformed-fish',
    _d);
exports.EMPTY_PIECE = '.';
exports.PIECE_COLOR_EMPTY = '.';
exports.BOARD_SEPARATOR = '/';
exports.ROW_NUMBER = 8;
exports.ROW_FIRST_INDEX = 0;
exports.ROW_LAST_INDEX = 7;
exports.CELL_COUNT = exports.ROW_NUMBER * exports.ROW_NUMBER;
exports.HORIZONTAL_CODE_LETTERS = 'abcdefgh';
exports.HORIZONTAL_NOTE_LETTERS = ['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច', 'ឆ', 'ជ'];
exports.VERTICAL_NOTE_LETTERS = ['១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩', '១០',
    '១១', '១២', '១៣', '១៤', '១៥', '១៦', '១៧', '១៨', '១៩', '២០',
    '២១', '២២', '២៣', '២៤', '២៥', '២៦', '២៧', '២៨', '២៩', '៣០'];
exports.HORIZONTAL_NOTE_LETTERS_ENGLISH = 'abcdefgh';
exports.VERTICAL_NOTE_LETTERS_ENGLISH = Array.from({ length: 30 }, function (_, i) { return "" + (i + 1); });
