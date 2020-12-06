import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day2',
  templateUrl: './day2.component.html',
  styleUrls: []
})
export class Day2Component implements OnInit {

  inputData = [];
  part1Result: number = 0;
  part2Result: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('app/day2/day4.input', { responseType: 'text'}).subscribe((data: any) => {
      this.inputData = data.split("\n").map(x => {
        let fields = x.split(" ");
        if(fields.length == 3) {
          let rangeFields = fields[0].split("-");
          let min = rangeFields[0];
          let max = rangeFields[1];
          let character = fields[1].split(":")[0];
          let password = fields[2].trim();
          return {
            min,
            max,
            character,
            password
          };
        }
        return null;
      });
      console.log("inputData = ", this.inputData)
      this.doPart1();
      this.doPart2();
    });
  }

  doPart1() {
    for(let i = 0; i < this.inputData.length; i++) {
      if(this.inputData[i]) {
        let data = this.inputData[i];
        let count = (data.password).split(data.character).length - 1;
        if(count >= data.min && count <= data.max) {
          this.part1Result++;
        }
      }
    }
  }

  doPart2() {
    for(let i = 0; i < this.inputData.length; i++) {
      if(this.inputData[i]) {
        let data = this.inputData[i];
        let firstPosition = data.password[data.min - 1] == data.character;
        let secondPosition = data.password[data.max - 1] == data.character;
        console.log("first = ", firstPosition);
        console.log("second = ", secondPosition);
        if(!(firstPosition && secondPosition)) {
          if (firstPosition || secondPosition) {
            this.part2Result++;
          }
        }
      }
    }
  }
}
