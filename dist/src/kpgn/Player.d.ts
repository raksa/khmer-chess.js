export declare type Option = {
    id?: string;
    name?: string;
};
export default class Player {
    name: string | null;
    id: string | null;
    constructor({ id, name }: Option);
    toJson(): {
        id: string | null;
        name: string | null;
    };
}
