import Piece from './Piece';
export default class Graveyard {
    pieces: Piece[];
    get lastIndex(): number;
    constructor(graveyardStr?: string);
    toString(): string;
}
