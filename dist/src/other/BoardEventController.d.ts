import { PieceIndex } from '../ren';
import EventHandler, { ListenerType } from './EventHandler';
export declare class BoardEvent {
    flag: string;
    actorPieceIndex: PieceIndex;
    get isAttack(): boolean;
    get isWin(): boolean;
    constructor({ flag, actorPieceIndex }: {
        flag: string;
        actorPieceIndex: PieceIndex;
    });
}
export default class BoardEventController extends EventHandler {
    static EVENT: string;
    constructor();
    fireEvent(boardEvent: BoardEvent): void;
    addBoardEventListener(listener: ListenerType<BoardEvent>): void;
    removeBoardEventListener(listener: ListenerType<BoardEvent>): void;
}
