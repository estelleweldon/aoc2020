import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Day1Component } from './day1/day1.component';
import {HttpClientModule} from "@angular/common/http";
import {Day2Component} from "./day2/day2.component";
import {Day3Component} from "./day3/day3.component";
import {Day4Component} from "./day4/day4.component";
import {Day5Component} from "./day5/day5.component";

@NgModule({
  declarations: [
    AppComponent,
    Day1Component,
    Day2Component,
    Day3Component,
    Day4Component,
    Day5Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
