import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day3',
  templateUrl: './day3.component.html',
  styleUrls: []
})
export class Day3Component implements OnInit {

  inputData = [];
  part1Result: number = 0;
  part2Result: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('app/day3/day3.input', { responseType: 'text'}).subscribe((data: any) => {
      this.inputData = data.split("\n").map(x=>x.trim());
      console.log("inputData = ", this.inputData)
      this.part1Result = this.doPart1(3, 1);
      this.doPart2();
    });
  }

  didIHitATree(row, index) {
    return (row[index] == '#');
  }

  doPart1(right, down) {
    let position = 0;
    let treesHit = 0;
    for(let i = 0; i < this.inputData.length; i = i + down) {
      if(this.inputData[i] && this.inputData.length > 0) {
        let row = this.inputData[i];
        if(position >= row.length) {
          position = Math.abs(row.length - position);
        }

        if(this.didIHitATree(row, position)) {
          treesHit++;
        }

        position = position + right;
      }
    }
    return treesHit;
  }

  doPart2() {
    this.part2Result = this.doPart1(1, 1) * this.doPart1(3, 1) * this.doPart1(5, 1) * this.doPart1(7, 1) * this.doPart1(1, 2);
  }
}
