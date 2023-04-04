import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  showComponentapp = true;
  showComponenthis = false;
  show: String;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.show = param.show;
    });
    if (this.show == 'his') {
      this.showComponentapp = false;
      this.showComponenthis = true;
    } else {
      this.showComponentapp = true;
      this.showComponenthis = false;
    }
  }

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
