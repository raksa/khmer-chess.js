"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardEvent = void 0;
var ren_1 = require("../ren");
var EventHandler_1 = __importDefault(require("./EventHandler"));
var BoardEvent = /** @class */ (function () {
    function BoardEvent(_a) {
        var flag = _a.flag, actorPieceIndex = _a.actorPieceIndex;
        this.flag = flag;
        this.actorPieceIndex = actorPieceIndex;
    }
    Object.defineProperty(BoardEvent.prototype, "isAttack", {
        get: function () {
            return this.flag === ren_1.EVENT_FLAG_ATTACK;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardEvent.prototype, "isWin", {
        get: function () {
            return this.flag === ren_1.EVENT_FLAG_WINN;
        },
        enumerable: false,
        configurable: true
    });
    return BoardEvent;
}());
exports.BoardEvent = BoardEvent;
var BoardEventController = /** @class */ (function (_super) {
    __extends(BoardEventController, _super);
    function BoardEventController() {
        return _super.call(this, {
            events: {
                EVENT: BoardEventController.EVENT,
            },
        }) || this;
    }
    BoardEventController.prototype.fireEvent = function (boardEvent) {
        this._addPropEvent(BoardEventController.EVENT, boardEvent);
    };
    BoardEventController.prototype.addBoardEventListener = function (listener) {
        this._addOnEventListener(BoardEventController.EVENT, listener);
    };
    BoardEventController.prototype.removeBoardEventListener = function (listener) {
        this._removeOnEventListener(BoardEventController.EVENT, listener);
    };
    BoardEventController.EVENT = 'event';
    return BoardEventController;
}(EventHandler_1.default));
exports.default = BoardEventController;
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
//# sourceMappingURL=BoardEventController.js.map