"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2021-2022, K4us
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
var index_1 = require("../../src/index");
var helper_1 = require("../test/helper");
describe('Should import successfully', function () {
    var kc;
    beforeAll(function () {
        kc = new index_1.KhmerChess(helper_1.demo1);
    });
    it('should return drawable table', function () {
        expect(kc.drawAscii()).toBe("  \u250F\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2513\n8 \u2503 b \u2503 h \u2503 g \u2503 k \u2503   \u2503   \u2503 h \u2503   \u2503\n  \u2523\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u252B\n7 \u2503   \u2503   \u2503 q \u2503 g \u2503   \u2503   \u2503 b \u2503   \u2503\n  \u2523\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u252B\n6 \u2503   \u2503   \u2503   \u2503   \u2503   \u2503 f \u2503 t \u2503   \u2503\n  \u2523\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u252B\n5 \u2503   \u2503   \u2503   \u2503   \u2503   \u2503   \u2503   \u2503   \u2503\n  \u2523\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u252B\n4 \u2503   \u2503   \u2503   \u2503   \u2503   \u2503   \u2503   \u2503   \u2503\n  \u2523\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u252B\n3 \u2503 T \u2503 F \u2503 F \u2503 F \u2503 F \u2503 F \u2503 F \u2503 F \u2503\n  \u2523\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u252B\n2 \u2503   \u2503   \u2503   \u2503   \u2503 G \u2503 H \u2503   \u2503   \u2503\n  \u2523\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u254B\u2501\u2501\u2501\u252B\n1 \u2503 B \u2503 H \u2503 G \u2503 Q \u2503 K \u2503   \u2503   \u2503 B \u2503\n  \u2517\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u251B\n    a   b   c   d   e   f   g   h\n  \u250F\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2533\u2501\u2501\u2501\u2513\n  \u2503 f \u2503 f \u2503 f \u2503 f \u2503 f \u2503 f \u2503\n  \u2517\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u253B\u2501\u2501\u2501\u251B");
    });
});
//# sourceMappingURL=table.Spec.js.map