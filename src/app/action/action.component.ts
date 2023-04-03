import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

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
}
