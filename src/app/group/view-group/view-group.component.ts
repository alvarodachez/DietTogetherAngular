import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {
  showActive: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showActive = true;
  }

  changeRanking() {
    this.showActive = true;
  }

  changeRegisters() {
    this.showActive = false;
  }

}
