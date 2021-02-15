export class MinesweeperTile {
    Bomb = false;
    Flag = false;
    Revealed = false;
    AdjacentBombs = 0;
    Safe = false;
    x: number;
    y: number;
}