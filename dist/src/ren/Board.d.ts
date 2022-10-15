import Piece from './Piece';
import PieceIndex from './PieceIndex';
/**
 * BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb => bhgqkghb/......../ffffffff/......../......../FFFFFFFF/......../BHGKQGHB
 */
export default class Board {
    pieceIndices: PieceIndex[];
    constructor(boardStr?: string);
    get piecesMultiArray(): (Piece | null)[][];
    get pieces(): (Piece | null)[];
    get whiteKing(): PieceIndex | undefined;
    get blackKing(): PieceIndex | undefined;
    getKing(color: string): PieceIndex | undefined;
    compress(str: string): string;
    extract(str: string): string;
    toStringFull(pieceIndices?: PieceIndex[]): string;
    toStringFullNoSeparate(): string;
    toString(pieceIndices?: PieceIndex[]): string;
    getPieceAtIndex(index: number): Piece | null;
    setPieceAtIndex(index: number, piece: Piece | null): void;
}
