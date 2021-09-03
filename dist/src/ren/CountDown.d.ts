export default class CountDown {
    countingDownFromNumber: number | null;
    whiteCountingDownNumber: number | null;
    blackCountingDownNumber: number | null;
    get isCountDownWhite(): boolean;
    get isCountDownBlack(): boolean;
    get isCountingDown(): boolean;
    static fromString(countdownStr: string): CountDown;
    toString(): string;
}
