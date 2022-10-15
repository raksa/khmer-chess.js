"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = /** @class */ (function () {
    function Timer(_a) {
        var totalSecond = _a.totalSecond, bonusTime = _a.bonusTime, currentWhite = _a.currentWhite, currentBlack = _a.currentBlack;
        this.bonusTime = bonusTime || 0;
        this.totalSecond = totalSecond || 0;
        this.currentWhite = currentWhite || 0;
        this.currentBlack = currentBlack || 0;
    }
    Timer.prototype.toJson = function () {
        return {
            totalSecond: this.totalSecond,
            bonusTime: this.bonusTime,
            currentWhite: this.currentWhite,
            currentBlack: this.currentBlack,
        };
    };
    return Timer;
}());
exports.default = Timer;
//# sourceMappingURL=Timer.js.map