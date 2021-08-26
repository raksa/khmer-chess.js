/* eslint-disable no-unused-vars */
// brain
import {
    HVPont,
    Rectangle,
    boardEventController,
    boardHelper,
    genMask,
    jsis,
    MoveHelper,
    OptionsType,
    CalCountPropsType,
    PIECE_COLOR_WHITE,
    PIECE_COLOR_BLACK,
    PIECE_TYPE_BOAT,
    PIECE_TYPE_HORSE,
    PIECE_TYPE_GENERAL,
    PIECE_TYPE_KING,
    PIECE_TYPE_QUEEN,
    PIECE_TYPE_FISH,
    PIECE_TYPE_TRANSFORM_FISH,
    EMPTY_PIECE,
    PIECE_COLOR_EMPTY,
    BOARD_SEPARATOR,
    ROW_NUMBER,
    ROW_FIRST_INDEX,
    ROW_LAST_INDEX,
    CELL_COUNT,
    HORIZONTAL_CODE_LETTERS,
    HORIZONTAL_NOTE_LETTERS,
    VERTICAL_NOTE_LETTERS,
    HORIZONTAL_NOTE_LETTERS_ENGLISH,
    VERTICAL_NOTE_LETTERS_ENGLISH,
} from './brain';
// kpgn
import {
    Captured,
    CapturedPropType,
    KPGN,
    Move,
    MovePropType,
    Player,
    Result,
    Timer,
} from './index';
// other
import {
    EventHandler,
    ListenerType,
    BoardEventController,
    BoardEvent,
    table,
} from './index';
// ren
import {
    Board,
    CountDown,
    Graveyard,
    KAttacked,
    KqMoved,
    Piece,
    PieceIndex,
    Point,
    REN,
    RENPropType,
    STRING_COUNT,
    DEFAULT_BOARD_STR,
    NOT_SET,
    PIECE_FLAG_KILL,
    PIECE_FLAG_JUMP,
} from './index';
//  index
import {
    KhmerChess,
} from './index';

describe('Should import successfully', function () {
    it('should work', () => {
        expect(KhmerChess.title).toBe('khmer-chess');
    });
});
