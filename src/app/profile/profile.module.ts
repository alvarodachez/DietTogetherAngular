import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LinearChartComponent } from '../common/linear-chart/linear-chart.component';
import { LinearGaugeChartComponent } from '../common/linear-gauge-chart/linear-gauge-chart.component';
import { GaugeChartComponent } from '../common/gauge-chart/gauge-chart.component';
import { ChartModule } from '../common/chart.module';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
    canActivate : [CanActivateGuard]
  },
];

@NgModule({
  declarations: [
    MyProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
    ChartModule
    
  ]
})
export class ProfileModule { }
