//Core
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Utilities
import { NbThemeModule, NbLayoutModule, NbCalendarRangeModule, NbDatepickerModule } from '@nebular/theme';
import { NgxMaskModule } from 'ngx-mask';

//Components
import { TestComponent } from './test/test.component';
import { HttpRequestInterceptor } from './http-request-interceptor';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CodingLandingComponent } from './coding-landing/coding-landing.component';
import { LcdComponent } from './lcd/lcd.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { NumeralsComponent } from './numerals/numerals.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { ClickerComponent } from './clicker/clicker.component';
import { HersirComponent } from './hersir/hersir.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NavComponent,
    FooterComponent,
    CodingLandingComponent,
    LcdComponent,
    ParagraphComponent,
    NumeralsComponent,
    GameOfLifeComponent,
    HomeComponent,
    AboutMeComponent,
    MinesweeperComponent,
    ClickerComponent,
    HersirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCalendarRangeModule,
    NbDatepickerModule.forRoot(),
    ReactiveFormsModule,
    ScrollingModule,
    NgbModule
  ],
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
