"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = __importDefault(require("./Player"));
var Result_1 = __importDefault(require("./Result"));
/**
 * Khmer portable game notation
 */
// TODO: improve KPGN
var KPGN = /** @class */ (function () {
    function KPGN(renInstant) {
        this.players = {
            white: new Player_1.default(),
            black: new Player_1.default(),
        };
        this.result = {
            last: {
                whiteWin: false,
                blackWin: false,
            },
            white: new Result_1.default(),
        };
        this.renInstant = renInstant;
        this.moves = [];
    }
    KPGN.prototype.toJson = function () {
        return {
            event: this.event,
            date: this.date,
            location: this.location,
            players: {
                white: this.players.white.toJson(),
                black: this.players.black.toJson(),
            },
            result: {
                last: {
                    whiteWin: this.result.last.whiteWin,
                    blackWin: this.result.last.blackWin,
                },
                white: this.result.white.toJson(),
            },
            moves: this.moves.map(function (m) { return m.toJson(); }),
            ren: this.renInstant.toString(),
            timer: this.timer.toJson(),
        };
    };
    return KPGN;
}());
exports.default = KPGN;
