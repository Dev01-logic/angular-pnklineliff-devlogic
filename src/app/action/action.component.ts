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

  showComponentapp = true;
  showComponenthis = false;

  toggleEnum = ToggleEnum;
  selectedState = ToggleEnum.Option1;
  onChange($event) {
    //console.log($event.value);
    this.selectedState = $event.value;
    if ($event.value == '0') {
      //console.log('test');
      this.showComponentapp = true;
      this.showComponenthis = false;
    } else if ($event.value == '1') {
      this.showComponentapp = false;
      this.showComponenthis = true;
    } else {
      this.showComponentapp = false;
      this.showComponenthis = false;
    }
  }
}
