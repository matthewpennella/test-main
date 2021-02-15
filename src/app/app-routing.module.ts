import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { CodingLandingComponent } from './coding-landing/coding-landing.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { LcdComponent } from './lcd/lcd.component';
import { NumeralsComponent } from './numerals/numerals.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { TestComponent } from './test/test.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { ClickerComponent } from './clicker/clicker.component';
import { HersirComponent } from './hersir/hersir.component';

const userRoutes: Routes = [
  {
    path: '',
    component: TestComponent
  },
  {
    path: 'CodeExamples',
    component: CodingLandingComponent
  },
  {
    path: 'CodeExamples/Numerals',
    component: NumeralsComponent
  },
  {
    path: 'CodeExamples/GameOfLife',
    component: GameOfLifeComponent
  },
  {
    path: 'CodeExamples/Paragraph',
    component: ParagraphComponent
  },
  {
    path: 'CodeExamples/LCD',
    component: LcdComponent
  },
  {
    path: 'CodeExamples/Minesweeper',
    component: MinesweeperComponent
  },
  {
    path: 'CodeExamples/Clicker',
    component: ClickerComponent
  },
  {
    path: 'CodeExamples/Hersir',
    component: HersirComponent
  },
  {
    path: 'AboutMe',
    component: AboutMeComponent
  },
];

const fallbackRoutes: Routes = [
  // otherwise redirect to home
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
RouterModule.forRoot(userRoutes),
    RouterModule.forRoot(fallbackRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
