import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart-advenced',
  templateUrl: './pie-chart-advenced.component.html',
  styleUrls: ['./pie-chart-advenced.component.scss']
})
export class PieChartAdvencedComponent  {

  
  @Input() single: any[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /* constructor() {
    Object.assign(this, { single });
  } */

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
