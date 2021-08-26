export default class Player {
    name: string | null;
    id: string | null;
    constructor(id?: string, name?: string);
    toJson(): {
        id: string;
        name: string;
    };
}
