export declare type Option = {
    win?: number;
    draw?: number;
    lost?: number;
};
export default class Result {
    win: number;
    draw: number;
    lost: number;
    constructor({ win, draw, lost }: Option);
    toJson(): {
        win: number;
        draw: number;
        lost: number;
    };
}
