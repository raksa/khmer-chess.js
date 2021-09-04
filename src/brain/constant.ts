export const PIECE_COLOR_WHITE = 'w';
export const PIECE_COLOR_BLACK = 'b';
export const COLOR_NAMES: { [key: string]: string } = {
    [PIECE_COLOR_BLACK]: 'ខ្មៅ',
    [PIECE_COLOR_WHITE]: 'ស',
};
export const COLOR_NAMES_ENGLISH: { [key: string]: string } = {
    [PIECE_COLOR_BLACK]: 'black',
    [PIECE_COLOR_WHITE]: 'white',
};

export const PIECE_TYPE_BOAT = 'b'; // Boat
export const PIECE_TYPE_HORSE = 'h'; // Horse
export const PIECE_TYPE_GENERAL = 'g'; // General
export const PIECE_TYPE_KING = 'k'; // King
export const PIECE_TYPE_QUEEN = 'q'; // Queen
export const PIECE_TYPE_FISH = 'f'; // Fish
export const PIECE_TYPE_TRANSFORM_FISH = 't'; // Transform fish
export const PIECE_NAMES: { [key: string]: string } = {
    [PIECE_TYPE_BOAT]: 'ទូក',
    [PIECE_TYPE_HORSE]: 'សេះ',
    [PIECE_TYPE_GENERAL]: 'គោល',
    [PIECE_TYPE_KING]: 'ស្តេច',
    [PIECE_TYPE_QUEEN]: 'នាង',
    [PIECE_TYPE_FISH]: 'ត្រី',
    [PIECE_TYPE_TRANSFORM_FISH]: 'ត្រីបក',
};
export const PIECE_NAMES_ENGLISH: { [key: string]: string } = {
    [PIECE_TYPE_BOAT]: 'boat',
    [PIECE_TYPE_HORSE]: 'horse',
    [PIECE_TYPE_GENERAL]: 'general',
    [PIECE_TYPE_KING]: 'king',
    [PIECE_TYPE_QUEEN]: 'queen',
    [PIECE_TYPE_FISH]: 'fish',
    [PIECE_TYPE_TRANSFORM_FISH]: 'transformed-fish',
};
export const EMPTY_PIECE = '.';
export const PIECE_COLOR_EMPTY = '.';
export const BOARD_SEPARATOR = '/';

export const ROW_NUMBER = 8;
export const ROW_FIRST_INDEX = 0;
export const ROW_LAST_INDEX = 7;
export const CELL_COUNT = ROW_NUMBER * ROW_NUMBER;

export const HORIZONTAL_CODE_LETTERS = 'abcdefgh';
export const HORIZONTAL_NOTE_LETTERS = ['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច', 'ឆ', 'ជ'];
export const VERTICAL_NOTE_LETTERS = ['០','១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
export const HORIZONTAL_NOTE_LETTERS_ENGLISH = 'abcdefgh';
export const VERTICAL_NOTE_LETTERS_ENGLISH = Array.from({ length: 10 }, (_, i) => `${i}`);
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