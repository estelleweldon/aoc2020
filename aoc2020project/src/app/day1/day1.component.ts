import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day1',
  templateUrl: './day1.component.html',
  styleUrls: []
})
export class Day1Component implements OnInit {

  inputData = [];
  part1Result: number = null;
  part2Result: number = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('app/day1/day4.input', { responseType: 'text'}).subscribe((data: any) => {
      this.inputData = data.split("\n").map(x=>+x);
      console.log("inputData = ", this.inputData)
      this.doPart1();
      this.doPart2();
    });
  }

  doPart1() {
    for(let i = 0; (i < this.inputData.length && this.part1Result == null); i++) {
      for(let j = 0; (j < this.inputData.length && this.part1Result == null); j++) {
        if((this.inputData[i] + this.inputData[j]) == 2020) {
          this.part1Result = (this.inputData[i] * this.inputData[j]);
          console.log("result = ", this.part1Result);
        }
      }
    }
  }

  doPart2() {
    for(let i = 0; (i < this.inputData.length && this.part2Result == null); i++) {
      for(let j = 0; (j < this.inputData.length && this.part2Result == null); j++) {
        for (let k = 0; (k < this.inputData.length && this.part2Result == null); k++) {
          if ((this.inputData[i] + this.inputData[j] + this.inputData[k]) == 2020) {
            this.part2Result = (this.inputData[i] * this.inputData[j] * this.inputData[k]);
            console.log("result = ", this.part2Result);
          }
        }
      }
    }
  }
}
