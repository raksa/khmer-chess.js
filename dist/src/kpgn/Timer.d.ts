export default class Timer {
    totalSecond: string;
    currentWhite: string;
    currentBlack: string;
    constructor(totalSecond: string, currentWhite: string, currentBlack: string);
    toJson(): {
        totalSecond: string;
        currentWhite: string;
        currentBlack: string;
    };
}
