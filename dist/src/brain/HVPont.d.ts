export default class HVPont {
    h: string;
    v: number;
    get x(): number;
    get y(): number;
    get indexCode(): string;
    constructor(h: string, v?: string | number);
}
