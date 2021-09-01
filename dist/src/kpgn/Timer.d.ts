export declare type Option = {
    totalSecond?: number;
    bonusTime?: number;
    currentWhite?: number;
    currentBlack?: number;
};
export default class Timer {
    bonusTime: number;
    totalSecond: number;
    currentWhite: number;
    currentBlack: number;
    constructor({ totalSecond, bonusTime, currentWhite, currentBlack }: Option);
    fromJson(): void;
    toJson(): {
        totalSecond: number;
        bonusTime: number;
        currentWhite: number;
        currentBlack: number;
    };
}
