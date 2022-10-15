"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.isContainsPoint = function (point) {
        var x = point.x, y = point.y;
        var isContainsPoint = this.x <= x &&
            (this.x + this.width) >= x &&
            this.y <= y &&
            (this.y + this.height) >= y;
        return isContainsPoint;
    };
    Rectangle.isValidPoint = function (point) {
        return new Rectangle(0, 0, constant_1.ROW_LAST_INDEX, constant_1.ROW_LAST_INDEX).isContainsPoint(point);
    };
    return Rectangle;
}());
exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map