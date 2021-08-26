declare const jsis: {
    isValid(v: any): boolean;
    isNull(v: any): boolean;
    isUndefined(v: any): boolean;
    isString(str: any): boolean;
    isNotEmpty(str: string): boolean;
    isNumber(n: any): boolean;
    isStringNumber(n: string): boolean;
    isArray(arr: any): boolean;
    isFunction(f: any): boolean;
    isObject(o: any): boolean;
    isBoolean(b: any): boolean;
    isTrue(b: any): any;
    isFalse(b: any): boolean;
    isPoint(p: {
        x: any;
        y: any;
    }): any;
    isSize(size: {
        width: any;
        height: any;
    }): any;
    isOdd(n: number): boolean;
    isEven(n: any): boolean;
    isUpperCase(str: string): boolean;
};
export default jsis;
