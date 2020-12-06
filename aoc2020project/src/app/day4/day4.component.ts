import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {hasRequireCalls} from "@angular/compiler-cli/ngcc/src/dependencies/commonjs_dependency_host";

enum PassportFields {
  byr = "byr",
  iyr = "iyr",
  eyr = "eyr",
  hgt = "hgt",
  hcl = "hcl",
  ecl = "ecl",
  pid = "pid",
  cid = "cid"
}

class PassportData {
  fields: any = {};

  constructor(passportFields: string[]) {
    for(let i = 0; i < passportFields.length; i++) {
      let field = passportFields[i].split(":");
      if (field.length == 2) {
        if(field[0] in PassportFields) {
          this.fields[field[0]] = field[1];
        }
      }
    }
  }

  isValidNum(numString: string, min?:number, max?:number) {
    let num = +numString;
    if(isNaN(num)) {
      return false
    }
    if(num < min || num > max) {
      return false;
    }
    return true;
  }

  isValid(): boolean {
    let isValid = true;
    for(const passportField of Object.keys(PassportFields)) {
      if(passportField != 'cid') {
        if (!(passportField in this.fields)) {
          isValid = false;
          break;
        }
        else {
          switch(passportField) {
            case PassportFields.byr:
              isValid = this.isValidNum(this.fields[passportField], 1920, 2002); break;
            case PassportFields.iyr:
              isValid = this.isValidNum(this.fields[passportField], 2010, 2020); break;
            case PassportFields.eyr:
              isValid = this.isValidNum(this.fields[passportField], 2020, 2030); break;
            case PassportFields.hgt:
              let inches = /in$/.test(this.fields[passportField]);
              let cm = /cm$/.test(this.fields[passportField]);
              if(inches) {
                let height = this.fields[passportField];
                height = height.replace("in", "");
                isValid = this.isValidNum(height, 59, 76);
              }
              else if(cm) {
                let height = this.fields[passportField];
                height = height.replace("cm", "");
                isValid = this.isValidNum(height, 150, 193);
              }
              else {
                isValid = false;
              }
              break;
            case PassportFields.hcl:
              isValid = /^#([a-fA-F0-9]{6})$/.test(this.fields[passportField]); break;
            case PassportFields.ecl:
              isValid = /^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/.test(this.fields[passportField]) && this.fields[passportField].length == 3; break;
            case PassportFields.pid:
              isValid = this.fields[passportField].length == 9 && !isNaN(+this.fields[passportField]); break;
          }
          if(!isValid) {
            console.log(passportField, this.fields[passportField], "is invalid");
            break;
          }
        }
      }
    }
    return isValid;
  }

}

@Component({
  selector: 'app-day4',
  templateUrl: './day4.component.html',
  styleUrls: []
})
export class Day4Component implements OnInit {

  inputData = [];
  part1Result: number = 0;
  part2Result: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('app/day4/day4.input', { responseType: 'text'}).subscribe((data: any) => {
      let rowData = data.split("\n").map(x=>x.trim());
      let fields = [];
      for(let i = 0; i < rowData.length; i++) {
        let foundEndOfChunk = true;
        let fs = rowData[i].split(" ");
        for(let j = 0; j < fs.length; j++) {
          if(fs[j] && fs[j] != "") {
            foundEndOfChunk = false;
            fields.push(fs[j]);
          }
        }
        if(foundEndOfChunk) {
          this.inputData.push(new PassportData(fields));
          fields = [];
        }
      }
      console.log("inputData = ", this.inputData)
      this.doPart1();
      // this.doPart2();
    });
  }

  doPart1() {
    let numValid = 0;
    for(let i = 0; i < this.inputData.length; i++) {
      if(this.inputData[i].isValid()) {
        numValid++;
      }
    }
    this.part1Result = numValid;
  }

  doPart2() {
  }
}
