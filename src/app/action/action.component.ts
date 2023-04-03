import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  showComponent = false;

  showMyComponent() {
    this.showComponent = true;
  }
}
