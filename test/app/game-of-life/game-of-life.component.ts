import { Component, OnInit } from '@angular/core';
import { LifeCell } from '../models/LifeCell';
import { ScreenService } from '../screen.service';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {
  
  LifeGrid: LifeCell[][] = [];
  stopLife = true;
  LifeXCells = 0;
  LifeYCells = 0;
  GenNumber = 0;
  StepSpeedMs = 1000;
  StepSpeeds = [100, 125, 250, 500, 1000, 2000];

  constructor(
    private screenService: ScreenService
  ) { }

  onResize(event) {
    this.LifeXCells = ((this.screenService.getScreenWidth() - 31) / 48) - 1;
    this.LifeYCells = ((this.screenService.getScreenHeight() - 167) / 40) - 3;
    if(this.screenService.getScreenHeight() < 1000) {
      this.LifeYCells = this.LifeYCells - 2;
    }
    this.generateLifeGridNew(this.LifeXCells, this.LifeYCells);
  }

  ngOnInit() {
    this.LifeXCells = ((this.screenService.getScreenWidth() - 31) / 48) - 1;
    this.LifeYCells = ((this.screenService.getScreenHeight() - 167) / 40) - 3;
    if(this.screenService.getScreenHeight() < 1000) {
      this.LifeYCells = this.LifeYCells - 3;
    }
    this.generateLifeGridInitial(this.LifeXCells, this.LifeYCells);
  }

  generateLifeGridInitial(col: number, row: number) {
    for(let i = 0; i < row; i ++) {
      let cols: LifeCell[] = [];
      for(let j = 0; j < col; j++) {
        cols.push(new LifeCell);
      }
      this.LifeGrid.push(cols);
    }
  }

  generateLifeGridNew(col: number, row:number) {
    let newGrid: LifeCell[][] = [];
    for(let i = 0; i < row; i ++) {
      let cols: LifeCell[] = [];
      for(let j = 0; j < col; j++) {
        if(i < this.LifeGrid.length && j < this.LifeGrid[i].length) {
          cols.push(this.LifeGrid[i][j])
        } else {
          cols.push(new LifeCell);
        }
      }
      newGrid.push(cols);
    }
    this.LifeGrid = newGrid;
  }

  swapCell(cell: LifeCell) {
    cell.state = !cell.state;
  }

  takeNextLifeStep() {
    let newGrid: LifeCell[][] = [];      
    let gridHeight = this.LifeGrid.length;
    let gridWidth = this.LifeGrid[0].length;
    this.LifeGrid.forEach(row => {
      let newrow: LifeCell[] = [];
      row.forEach(cell => {
        newrow.push(Object.assign({}, cell));
      });
      newGrid.push(Object.assign([], newrow));
    });

    for(let i = 0; i < gridHeight; i++) {
      for(let j = 0; j < gridWidth; j++) {
        let neighbors = 0;
        for(let x = i-1; x < i+2; x++) {
          for(let y = j-1; y < j+2; y++) {
            if(0 <= x && x < gridHeight && 0 <= y && y < gridWidth && !(y === j && x === i)) {
              if(this.LifeGrid[x][y].state === true) {
                neighbors++;
              }
            }
          }
        }
        if((neighbors < 2 || neighbors > 3) && this.LifeGrid[i][j].state === true) {
          this.swapCell(newGrid[i][j]);
        } else if(neighbors === 3 && this.LifeGrid[i][j].state === false){
          this.swapCell(newGrid[i][j]);
        }
      }
    }
    this.LifeGrid = newGrid;
    this.GenNumber++;
  }

  continuousLifeSteps() {
    this.stopLife = false;
    setTimeout(() => 
      {
        if(this.stopLife === false) {
          this.takeNextLifeStep();
          this.continuousLifeSteps();
        }
      },
      this.StepSpeedMs);
  }

  speedDown() {
    this.StepSpeedMs = this.StepSpeeds[this.StepSpeeds.indexOf(this.StepSpeedMs) - 1];
  }

  speedUp() {
    this.StepSpeedMs = this.StepSpeeds[this.StepSpeeds.indexOf(this.StepSpeedMs) + 1];
  }

  stop() {
    this.stopLife = true;
  }

  clear() {
    this.LifeGrid.forEach(row => {
      row.forEach(cell => {
        cell.state = false;
      });
    });
  }

}
