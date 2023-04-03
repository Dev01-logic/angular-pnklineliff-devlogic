import { Component, OnInit } from '@angular/core';
export enum ToggleEnum {
  Option1,
  Option2,
}
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  color1 = 'blue';
  color2 = 'light';
  showComponentapp = false;
  showComponenthis = false;

  showMyComponentapp() {
    this.showComponentapp = true;
    this.showComponenthis = false;
  }

  showMyComponenthis() {
    this.showComponentapp = false;
    this.showComponenthis = true;
  }

  toggleEnum = ToggleEnum;
  selectedState = ToggleEnum.Option1;
  onChange($event) {
    console.log($event.value);
    this.selectedState = $event.value;
    if (($event.value = 0)) {
      this.showComponentapp = true;
      this.showComponenthis = false;
    } else if (($event.value = 1)) {
      this.showComponentapp = false;
      this.showComponenthis = true;
    } else {
      this.showComponentapp = false;
      this.showComponenthis = false;
    }
  }
}
