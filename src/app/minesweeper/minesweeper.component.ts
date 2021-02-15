import { Component, OnInit } from '@angular/core';
import { ScreenService } from '../screen.service';
import { MinesweeperTile } from './../models/MinesweeperTile';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  TilesXInput = 16;
  TilesYInput = 30;
  MinesInput = 99;
  TilesX: number = 0;
  TilesY: number = 0;
  Mines: number = 0;
  FirstClick = false;
  GameLost = false;
  GameWon = false;
  MinesCoord: {x: number, y: number}[] = [];
  MineClicked: MinesweeperTile = new MinesweeperTile;
  Difficulty = 'Custom';

  MinesweeperGrid: MinesweeperTile[][] = [];

  fieldHeight;
  fieldWidth;
  divHeight;
  divWidth;

  constructor(
    private screenService: ScreenService
  ) { }

  ngOnInit() {
    this.divHeight = this.screenService.getScreenHeight() - 250 + 'px';
    this.divWidth = this.screenService.getScreenWidth() - 30 + 'px';
    this.CreateGrid(this.TilesXInput, this.TilesYInput, this.MinesInput);
  }

  onResize(event) {
    this.divHeight = this.screenService.getScreenHeight() - 250 + 'px';
    this.divWidth = this.screenService.getScreenWidth() - 30 + 'px';
  }

  ClickTile(tile: MinesweeperTile) {
    if(this.GameLost === true || this.GameWon === true) {
      return;
    }
    if(this.FirstClick === true) {
      // If it's the first click, generate a 3x3 safe zone and place bombs
      this.GenerateSafeZone(tile.x, tile.y);
      this.GenerateBombs();
      this.FirstClick = false;
      for(let i = tile.x-1; i < tile.x+2; i++) {
        for(let j = tile.y-1; j < tile.y+2; j++) {
          if(0 <= i && i < this.TilesX && 0 <= j && j < this.TilesY && !(tile.y === j && tile.x === i)) {
            this.ExpandVisibleArea(this.MinesweeperGrid[i][j]);
          }
        }
      }
    } else if (tile.Bomb === true) {
      // If you click a bomb, you lose and bomb tiles are revealed
      this.MineClicked = tile;
      this.GameLost = true;
      this.MinesCoord.forEach(mine => {
        this.MinesweeperGrid[mine.x][mine.y].Revealed = true;
      });
      return;
    } else {
      // Otherwise, process a normal click
      this.ExpandVisibleArea(tile);
    }
    let RevealedTotal = 0;
    this.MinesweeperGrid.forEach(col => {
      col.forEach(cell =>{
        if(cell.Revealed === true) {
          RevealedTotal++;
        }
      });
    });
    if(RevealedTotal + Number(this.Mines) === this.TilesX * this.TilesY) {
      this.GameWon = true;
    }
  }

  CreateGrid(row: number, col: number, mines: number) {
    this.TilesX = row;
    this.TilesY = col;
    this.Mines = mines;
    this.FirstClick = true;
    this.GameLost = false;
    this.GameWon = false;
    this.MinesweeperGrid = [];
    this.MinesCoord = [];
    this.MineClicked = new MinesweeperTile;
    
    this.fieldWidth = (this.TilesY * 40 + 23).toString() + 'px';
    this.fieldHeight = (this.TilesX * 40 + 15).toString() + 'px';

    for(let x = 0; x < row; x++) {
      let cols: MinesweeperTile[] = [];
      for(let y = 0; y < col; y++) {
        let tile = new MinesweeperTile;
        tile.x = x;
        tile.y = y;
        cols.push(tile);
      }
      this.MinesweeperGrid.push(cols);
    }
  }

  FlagCell(tile: MinesweeperTile) {
    tile.Flag = !tile.Flag;
    return false;
  }

  NoRightClick() {
    return false;
  }

  GenerateBombs() {
    // Generate random coordinates for each bomb.
    for(let m = 0; m < this.Mines; m++) {
      this.MinesCoord.push({x: 0, y: 0});
      this.MinesCoord[m].x = (Math.floor(Math.random() * this.TilesX));
      this.MinesCoord[m].y = (Math.floor(Math.random() * this.TilesY));
    }
    
    // Try and place each bomb in the spot for it's random coordinates. If it's already occupied, generate new coordinates and try again.
    for(let m = 0; m < this.Mines; m++) {
      if(this.MinesweeperGrid[this.MinesCoord[m].x][this.MinesCoord[m].y].Bomb === false && this.MinesweeperGrid[this.MinesCoord[m].x][this.MinesCoord[m].y].Safe === false) {
        this.MinesweeperGrid[this.MinesCoord[m].x][this.MinesCoord[m].y].Bomb = true;
      } else {
        this.MinesCoord[m].x = Math.floor(Math.random() * this.TilesX);
        this.MinesCoord[m].y = Math.floor(Math.random() * this.TilesY);
        m--;
      }
    }

    // Once all bombs are set, set the AdjacentBomb numbers on each tile.
    for(let x = 0; x < this.TilesX; x++) {
      for(let y = 0; y < this.TilesY; y++) {
        for(let i = x-1; i < x+2; i++) {
          for(let j = y-1; j < y+2; j++) {
            if(0 <= i && i < this.TilesX && 0 <= j && j < this.TilesY && !(y === j && x === i)) {
              if(this.MinesweeperGrid[i][j].Bomb === true) {
                this.MinesweeperGrid[x][y].AdjacentBombs++;
              }
            }
          }
        }
      }
    }
  }

  GenerateSafeZone(x: number, y: number) {
    // Generate a 3x3 zone where no bombs can be placed around the first click.
    for(let i = x-1; i < x+2; i++) {
      for(let j = y-1; j < y+2; j++) {
        if(0 <= i && i < this.TilesX && 0 <= j && j < this.TilesY ) {
          this.MinesweeperGrid[i][j].Safe = true;
          this.MinesweeperGrid[i][j].Revealed = true;
        }
      }
    }
  }

  ExpandVisibleArea(tile: MinesweeperTile) {
    if(tile.AdjacentBombs > 0) {
      // If you click a tile next to a bomb, display the amount of bombs
      tile.Revealed = true;
    } else if (tile.AdjacentBombs === 0) {
      // If you click a tile with no adjacent bombs, reveal all connected empty tiles
      if(tile.Revealed !== true) {
        tile.Revealed = true;
      }
      for(let i = tile.x-1; i < tile.x+2; i++) {
        for(let j = tile.y-1; j < tile.y+2; j++) {
          if(0 <= i && i < this.TilesX && 0 <= j && j < this.TilesY && !(tile.x === j && tile.y === i)) {
            if(this.MinesweeperGrid[i][j].Revealed === false) {
              // For every tile around the 0-bomb tile, visit nearby unrevealed tiles and repeat on them
              this.ExpandVisibleArea(this.MinesweeperGrid[i][j]);
            }
          }
        }
      }
    }
  }

}
