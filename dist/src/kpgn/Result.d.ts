export default class Result {
    win: number;
    draw: number;
    lost: number;
    constructor(win?: number, draw?: number, lost?: number);
    toJson(): {
        win: number;
        draw: number;
        lost: number;
    };
}
