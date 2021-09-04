declare const jsis: {
    isValid(v: any): boolean;
    isNull(v: any): boolean;
    isUndefined(v: any): boolean;
    isString(str: any): any;
    isNotEmpty(str: string): any;
    isNumber(n: any): any;
    isStringNumber(n: string): any;
    isArray(arr: any): any;
    isFunction(f: any): any;
    isObject(o: any): any;
    isBoolean(b: any): any;
    isTrue(b: any): any;
    isFalse(b: any): any;
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
