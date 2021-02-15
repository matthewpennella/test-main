import { Component, OnInit } from '@angular/core';
import { Numerals } from '../models/Numerals';

@Component({
  selector: 'app-numerals',
  templateUrl: './numerals.component.html',
  styleUrls: ['./numerals.component.scss']
})
export class NumeralsComponent implements OnInit {

  numeralInput = '14';
  numeralSolutionStr = '';

  constructor() { }

  ngOnInit() {
    this.formatNumbertoNumerals();
  }

  formatNumbertoNumerals() {
    this.numeralSolutionStr = '';
    let numeral = [...this.numeralInput];
    let numeralSolution = [''];
    let nums = new Numerals;
    if(Number(this.numeralInput) > 3999) {
      this.numeralSolutionStr = 'Invalid number';
      return;
    }

    for(let i = 0; i <= numeral.length - 1; i++) {
      let tempstring = '';
      if(Number(numeral[i]) < 4) {
        for(let j = 0; j < Number(numeral[i]); j++) {
          tempstring = tempstring + nums.Places[numeral.length-i-1][0];
        }
      } else if (Number(numeral[i]) === 4) {
        tempstring = tempstring + nums.Places[numeral.length-i-1][0] + nums.Places[numeral.length-i-1][1];
      } else if(Number(numeral[i]) >= 5 && Number(numeral[i]) < 9) {
        tempstring = tempstring + nums.Places[numeral.length-i-1][1];
        for(let j = 0; j < Number(numeral[i]) - 5; j++) {
          tempstring = tempstring + nums.Places[numeral.length-i-1][0];
        }
      } else if(Number(numeral[i]) === 9) {
        tempstring = tempstring + nums.Places[numeral.length-i-1][0] + nums.Places[numeral.length-i][0];
      }

      numeralSolution.push(tempstring);
    }
    numeralSolution.forEach(numeral => {
      this.numeralSolutionStr = this.numeralSolutionStr + numeral;
    })
  }

}
