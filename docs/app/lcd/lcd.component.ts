import { Component, OnInit } from '@angular/core';
import { LCD, LCDNumbers } from '../models/LCD';

@Component({
  selector: 'app-lcd',
  templateUrl: './lcd.component.html',
  styleUrls: ['./lcd.component.scss']
})
export class LcdComponent implements OnInit {

  LCDDisplay: LCD[] = [];
  LCDNum = '0123456789';

  constructor() { }

  ngOnInit() {
    this.formatLCD();
  }

  formatLCD() {
    this.LCDDisplay = [];
    let LCDNumber = [...this.LCDNum];
    let LCDNumList = new LCDNumbers;

    LCDNumber.forEach(digit => {
      let L = new LCD;
      L.number = digit;
      this.LCDDisplay.push(L);
    });

    this.LCDDisplay.forEach(digit => {
      switch(digit.number) {
        case '0':
          digit.display = LCDNumList.Zero;
          break;
        case '1':
          digit.display = LCDNumList.One;
          break;
        case '2':
          digit.display = LCDNumList.Two;
          break;
        case '3':
          digit.display = LCDNumList.Three;
          break;
        case '4':
          digit.display = LCDNumList.Four;
          break;
        case '5':
          digit.display = LCDNumList.Five;
          break;
        case '6':
          digit.display = LCDNumList.Six;
          break;
        case '7':
          digit.display = LCDNumList.Seven;
          break;  
        case '8':
          digit.display = LCDNumList.Eight;
          break;   
        case '9':
          digit.display = LCDNumList.Nine;
          break;   
        default:
          break;
      }
    });
  }
}
