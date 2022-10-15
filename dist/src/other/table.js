"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
function renderLine(pieces) {
    return pieces.map(function (piece) {
        return " " + (piece === null ? ' ' : piece.pieceCharCode) + " ";
    }).join('┃');
}
function asciiTable(ren) {
    var piecesMultiArray = ren.board.piecesMultiArray;
    var str = '  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓';
    var result = __spreadArray([], piecesMultiArray, true).reverse().reduce(function (s, subArr, i) {
        var rs = renderLine(subArr);
        var bottom = i === piecesMultiArray.length - 1 ?
            '┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛' :
            '┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫';
        s += "\n" + (8 - i) + " \u2503" + rs + "\u2503\n  " + bottom;
        return s;
    }, str);
    var gyTStr = ren.graveyard.pieces.map(function () { return '━━━'; }).join('┳');
    var gyStr = renderLine(ren.graveyard.pieces);
    var gyBStr = ren.graveyard.pieces.map(function () { return '━━━'; }).join('┻');
    var graveyardStr = "  \u250F" + gyTStr + "\u2513\n  \u2503" + gyStr + "\u2503\n  \u2517" + gyBStr + "\u251B";
    return result + "\n    a   b   c   d   e   f   g   h\n" + graveyardStr;
}
exports.default = asciiTable;
/*
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
8 ┃   ┃   ┃   ┃   ┃ k ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
7 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
6 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
5 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
4 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
3 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
2 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
1 ┃   ┃   ┃   ┃ K ┃   ┃   ┃   ┃   ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
    a   b   c   d   e   f   g   h
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
  ┃ b ┃ h ┃ g ┃ q ┃ g ┃ h ┃ b ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ B ┃ H ┃ G ┃ Q ┃ G ┃ H ┃ B ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
 */
//# sourceMappingURL=table.js.map