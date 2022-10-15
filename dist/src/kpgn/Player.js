"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(_a) {
        var id = _a.id, name = _a.name;
        this.id = id || '';
        this.name = name || '';
    }
    Player.prototype.toJson = function () {
        return {
            id: this.id,
            name: this.name,
        };
    };
    return Player;
}());
exports.default = Player;
//# sourceMappingURL=Player.js.map