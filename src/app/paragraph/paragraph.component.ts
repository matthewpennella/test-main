import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  paragraph = 'this is not';
  paragraphOutput: string = '';
  maxLine = 3;

  constructor() { }

  ngOnInit() {
    this.formatText();
  }

  formatText() {
    // work on this
    this.paragraphOutput = this.paragraph;
    let paragraphLetters = [...this.paragraphOutput];
    
    let finished = false;
    let start = 0;
    let pointer = 0;
    this.maxLine = Number(this.maxLine);
    let totallength = paragraphLetters.length;
    while(finished === false) {
      pointer = start;
      if(pointer + this.maxLine >= totallength) {
        finished = true;
      } else {
        pointer = pointer + this.maxLine;
        if (paragraphLetters[pointer+1] && paragraphLetters[pointer+1] === ' ') {
          paragraphLetters[pointer+1] = '<br>';
          start = pointer + 1;
        }
        for(start; pointer >= start; pointer--) {
          if(paragraphLetters[pointer] === ' ') {
            paragraphLetters[pointer] = '<br>';
            start = pointer;
          } else if(start === pointer){
            pointer = pointer + this.maxLine;
            paragraphLetters.splice(pointer, 0, '-<br>');
            start = pointer + 1;
            totallength++;
            
          }
        }
      }
    }
    this.paragraphOutput = paragraphLetters.join('');
  }

}
