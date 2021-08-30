export default class Timer {
    bonusTime: number;
    totalSecond: number;
    currentWhite: number;
    currentBlack: number;
    constructor(totalSecond: number, bonusTime: number, currentWhite: number, currentBlack: number);
    toJson(): {
        totalSecond: number;
        bonusTime: number;
        currentWhite: number;
        currentBlack: number;
    };
}
