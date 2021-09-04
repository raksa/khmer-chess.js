export default class CountUp {
    countingFromNumber: number | null;
    countingNumber: number | null;
    isCountingUp: boolean;
    color: string | null;
    get isWhite(): boolean;
    get isBlack(): boolean;
    get isWhiteCounting(): boolean;
    get isBlackCounting(): boolean;
    get isCounting(): boolean;
    get isCountingOut(): boolean;
    set(color: string, countingFromNumber: number, countingNumber: number): void;
    clear(): void;
    checkUp(color: string): void;
    static fromString(countUpStr: string): CountUp;
    toString(): string;
}
