import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Day1Component} from "./day1/day1.component";
import {Day2Component} from "./day2/day2.component";
import {Day3Component} from "./day3/day3.component";
import {Day4Component} from "./day4/day4.component";
import {Day5Component} from "./day5/day5.component";
import {Day6Component} from "./day6/day6.component";

const routes: Routes = [
  {path: 'day1', component: Day1Component},
  {path: 'day2', component: Day2Component},
  {path: 'day3', component: Day3Component},
  {path: 'day4', component: Day4Component},
  {path: 'day5', component: Day5Component},
  {path: 'day6', component: Day6Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
