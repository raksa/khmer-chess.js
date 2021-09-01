import Piece from './Piece';
export default class Graveyard {
    pieces: Piece[];
    get lastIndex(): number;
    get(index: number): Piece;
    constructor(graveyardStr?: string);
    toString(): string;
}
