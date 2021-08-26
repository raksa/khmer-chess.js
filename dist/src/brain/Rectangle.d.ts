import { Point } from '../ren';
export default class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    isContainsPoint(point: Point): boolean;
    static isValidPoint(point: Point): boolean;
}
