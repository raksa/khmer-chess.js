export default class Point {
    x: number;
    y: number;
    get index(): number;
    get graveyardIndex(): number;
    get indexCode(): string;
    get title(): string;
    get titleEnglish(): string;
    get h(): string;
    get v(): number;
    constructor(x: number, y: number);
    static xyToIndex(x: number, y: number): number;
    static indexCodeToXY(indexCode: string): {
        x: number;
        y: number;
    };
    static indexCodeToIndex(indexCode: string): number;
    static fromIndexCode(indexCode: string): Point;
    static indexToXY(index: number): {
        x: number;
        y: number;
    };
    static fromIndex(index: number): Point;
    static fromIndexGraveyardIndex(index: number): Point;
    static isIndexInBoard(index: number): boolean;
}
