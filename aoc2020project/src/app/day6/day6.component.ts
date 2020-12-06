import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day6',
  templateUrl: './day6.component.html',
  styleUrls: []
})
export class Day6Component implements OnInit {

  inputData = [];
  part1Result: number = 0;
  part2Result: number = 0;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('app/day6/day6.input', { responseType: 'text'}).subscribe((data: any) => {
      let rowData = data.split("\n").map(x=>x.trim());
      let groupSet = new Set();
      let groupAnswers = [];
      for(let i = 0; i < rowData.length; i++) {
        if(rowData[i] == "") {
          this.part1Result = this.part1Result + groupSet.size;

          for(let char of groupSet) {
            let allYes = true;
            console.log("groupSet j = ", char)
            for(let k = 0; k < groupAnswers.length; k++) {
              if(groupAnswers[k].indexOf(char) < 0) {
                allYes = false;
              }
            }
            if(allYes) {
              this.part2Result++;
            }
          }

          groupSet.clear();
          groupAnswers = [];
        }
        else {
          groupAnswers.push(rowData[i]);
          for(let j = 0; j < rowData[i].length; j++) {
            groupSet.add(rowData[i][j]);
          }
        }
      }
    });
  }
}
