import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { WelcomeGroupComponent } from './welcome-group/welcome-group.component';
import { ManagementGroupComponent } from './management-group/management-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartModule } from '../common/chart.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LinearChartComponent } from '../common/linear-chart/linear-chart.component';



const routes: Routes = [

  {
    path: '',
    component: WelcomeGroupComponent,
    canActivate : [CanActivateGuard]
  },
  {
    path: 'welcome',
    component: WelcomeGroupComponent,
    canActivate : [CanActivateGuard]
  },
  {
    path: 'management',
    component: ManagementGroupComponent,
    canActivate : [CanActivateGuard]
  },
  {
    path: 'groupview',
    component: ViewGroupComponent,
    canActivate : [CanActivateGuard]
  }
];

@NgModule({
  declarations: [
    WelcomeGroupComponent,
    ManagementGroupComponent,
    ViewGroupComponent,
    
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ChartModule,
    NgxChartsModule,
    RouterModule.forChild(routes),
  ],
  providers:[
    DatePipe
  ]
})
export class GroupModule { }
