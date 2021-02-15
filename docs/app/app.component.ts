import { Component, OnInit } from '@angular/core';
import { RoutingStateService } from './routing-state.service';
import { ScreenService } from './screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  screenHeight;
  screenWidth;
  fieldHeight = '0px';
  fieldWidth = '0px';

  ScreenHeightSub = this.screenService.screenHeight.subscribe(val => {
    this.screenHeight = val;
  });

  ScreenWidthSub = this.screenService.screenWidth.subscribe(val => {
    this.screenWidth = val;
  });

  FieldHeightSub = this.screenService.fieldHeight.subscribe(val => {
    this.fieldHeight = val;
  });

  FieldWidthSub = this.screenService.fieldWidth.subscribe(val => {
    this.fieldWidth = val;
  });


  constructor(
    private routingStateService: RoutingStateService,
    private screenService: ScreenService
  ) {
    this.routingStateService.loadRouting();
    this.screenService.getScreenSize();
  }

  onResize(event) {
    this.screenService.getScreenSize();
  }

  ngOnInit(): void { }
  
}
