import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {hasRequireCalls} from "@angular/compiler-cli/ngcc/src/dependencies/commonjs_dependency_host";

export class TreeNode {
  leftNode: TreeNode = null;
  rightNode: TreeNode = null;

  value: number = 0;

  constructor() {
  }
}

export class SeatingChart {
  root: TreeNode = null;
  leaves: TreeNode[] = [];
  leftChar: string;
  rightChar: string;

  constructor(depth: number, leftChar: string, rightChar: string) {
    this.leftChar = leftChar;
    this.rightChar = rightChar;
    for(let i = 0; i < Math.pow(2, depth); i++) {
      let leaf = new TreeNode();
      leaf.value = i;
      this.leaves.push(leaf);
    }
    this.root = this.buildTree(this.leaves);
  }

  buildTree(leaves: TreeNode[]) {
    let newLeaves: TreeNode[] = [];
    for(let i = 0; i < leaves.length; i = i + 2) {
      let leaf = new TreeNode();
      leaf.leftNode = leaves[i];
      leaf.rightNode = leaves[i + 1];
      newLeaves.push(leaf);
    }
    if(newLeaves.length == 1) {
      return newLeaves[0];
    }
    return this.buildTree(newLeaves);
  }

  parseValue(code: string) {
    let node = this.root;
    for(let i = 0; i < code.length; i++) {
      if(code[i] == this.leftChar) {
        node = node.leftNode;
      }
      else {
        node = node.rightNode;
      }
    }
    return node.value;
  }
}

export class BoardingPass {
  rowNumber: number;
  seatNumber: number;

  constructor(boardingPassCode: string, seatingChart: SeatingChart, rowChart: SeatingChart) {
    let rowCode = boardingPassCode.slice(0, 7);
    let seatCode = boardingPassCode.slice(7,11);
    this.rowNumber = rowChart.parseValue(rowCode);
    this.seatNumber = seatingChart.parseValue(seatCode);
  }

  getSeatId() {
    return this.rowNumber * 8 + this.seatNumber;
  }
}

@Component({
  selector: 'app-day5',
  templateUrl: './day5.component.html',
  styleUrls: []
})
export class Day5Component implements OnInit {

  inputData = [];
  seatingChart = new SeatingChart(3, "L", "R");
  rowChart = new SeatingChart(7, "F", "B");
  part1Result: number = 0;
  part2Result: number = 0;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('app/day5/day5.input', { responseType: 'text'}).subscribe((data: any) => {
      let rowData = data.split("\n").map(x=>x.trim());
      let max = 0;
      for(let i = 0; i < rowData.length; i++) {
        if(rowData[i] != "") {
          let boardingPass = new BoardingPass(rowData[i], this.seatingChart, this.rowChart)
          this.inputData.push(boardingPass.getSeatId());
          let seatId = boardingPass.getSeatId();
          if(seatId > max) {
            max = seatId;
          }
        }
      }
      this.part1Result = max;
      let sorted = this.inputData.sort((x, y) => { return x - y; });
      let missingId = null;
      for(let i = 0; i < sorted.length - 1; i++) {
        if(sorted[i] + 1 != sorted[i + 1]) {
          missingId = sorted[i] + 1;
        }
      }
      this.part2Result = missingId;
    });
  }
}
