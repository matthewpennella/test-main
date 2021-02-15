import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private router: Router) { }

  screenHeight: BehaviorSubject<Number> = new BehaviorSubject(0);
  screenWidth: BehaviorSubject<Number> = new BehaviorSubject(0);
  fieldHeight: BehaviorSubject<string> = new BehaviorSubject('0px');
  fieldWidth: BehaviorSubject<string> = new BehaviorSubject('0px');

  getScreenSize(event?) {
    this.screenHeight.next(window.innerHeight);
    this.screenWidth.next(window.innerWidth);

    this.fieldHeight.next(String((Number(this.screenHeight.getValue()) - 75) + 'px'));
    this.fieldWidth.next(String(Number(this.screenWidth.getValue()) * 1) + 'px');
  }

  getScreenHeight() {
    return Number(this.screenHeight.getValue());
  }

  getScreenWidth() {
    return Number(this.screenWidth.getValue());
  }

  getFieldHeight() {
    return this.fieldHeight.getValue().toString();
  }

  getFieldWidth() {
    return this.fieldWidth.getValue().toString();
  }
}
