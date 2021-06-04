import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-linear-gauge-chart',
  templateUrl: './linear-gauge-chart.component.html',
  styleUrls: ['./linear-gauge-chart.component.scss']
})
export class LinearGaugeChartComponent {

  single: any[];

  @Input() value:number;
  @Input() units:string;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(event) {
    console.log(event);
  }

}
