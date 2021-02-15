import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodePage } from '../models/CodePages';
import { ScreenService } from './../screen.service';

@Component({
  selector: 'app-coding-landing',
  templateUrl: './coding-landing.component.html',
  styleUrls: ['./coding-landing.component.scss']
})
export class CodingLandingComponent implements OnInit {

  tableHeightGridDisplay = '0px';
  PageItemsMax = 0;
  rowHeight = 47;
  currentSort = '';

  Pages: CodePage[] = [
   /* {
        Title: 'LCD',
        Link: 'LCD',
        Description: 'Display 3x3 LCD representation of an entered number.'
    },
    {
      Title: 'Roman Numeral Conversion',
      Link: 'Numerals',
      Description: 'Convert numbers to roman numerals up to 4000, and convert numerals to numbers.'
    },
    {
      Title: 'Word Wrap',
      Link: 'Paragraph',
      Description: 'Format a paragraph to wrap words to a newline at set intervals. Words too long for a single line will be cut off and resume on the next line.'
    },*/
    {
      Title: 'Conway\'s Game of Life',
      Link: 'GameOfLife',
      Description: 'Playable version of Conway\'s Game of Life.'
    },
    {
      Title: 'Minesweeper',
      Link: 'Minesweeper',
      Description: 'It\'s just Minesweeper.'
    },
    {
      Title: 'Clicker Game',
      Link: 'Clicker',
      Description: 'Work in progress.'
    },
    {
      Title: 'Hersir Name Generator',
      Link: 'Hersir',
      Description: 'Generate an Age of Mythology Hersir Name.'
    }
  ]

  constructor(
    private screenService: ScreenService
  ) { }

  ngOnInit() {
    this.tableHeightGridDisplay = String(this.screenService.getScreenHeight() - 200) + 'px';
    this.PageItemsMax = Math.floor(Number(this.screenService.getScreenHeight() - 200) / this.rowHeight);
  }

  onResize(event) {
    this.tableHeightGridDisplay = String(this.screenService.getScreenHeight() - 200) + 'px';
    this.PageItemsMax = Math.floor(Number(this.screenService.getScreenHeight() - 200) / this.rowHeight);
  }

  sortDetails(field: string) {
    let tempList: CodePage[] = [];
    if (field === 'Description' || field === 'Title') {
      if (this.currentSort !== field) {
        tempList = this.Pages.sort((a, b) => a[field].localeCompare(b[field]));
        this.Pages = [...tempList];
        this.currentSort = field;
      } else {
        tempList = this.Pages.reverse();
        this.Pages = [...tempList];
      }
    } else { //In case numeric sorting is needed in the future
      if (this.currentSort !== field) {
        tempList = this.Pages.sort((a, b) => +a[field] - +b[field]);
        this.Pages = [...tempList];
        this.currentSort = field;
      } else {
        tempList = this.Pages.reverse();
        this.Pages = [...tempList];
      }
    }
  }

}
