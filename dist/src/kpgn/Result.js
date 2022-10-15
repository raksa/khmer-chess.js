"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Result = /** @class */ (function () {
    function Result(_a) {
        var win = _a.win, draw = _a.draw, lost = _a.lost;
        this.win = win || 0;
        this.draw = draw || 0;
        this.lost = lost || 0;
    }
    Result.prototype.toJson = function () {
        return {
            win: this.win,
            draw: this.draw,
            lost: this.lost,
        };
    };
    return Result;
}());
exports.default = Result;
//# sourceMappingURL=Result.js.map