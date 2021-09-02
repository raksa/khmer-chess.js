import Piece from './Piece';
export default class Graveyard {
    pieces: Piece[];
    get lastIndex(): number;
    get(index: number): Piece;
    removeAtIndex(index: number): boolean;
    constructor(graveyardStr?: string);
    toString(): string;
}
