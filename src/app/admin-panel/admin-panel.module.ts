import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';
import { AdminGuard } from '../entry/services/admin.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canActivate : [CanActivateGuard, AdminGuard] 
  },
  {
    path: 'report/:id',
    component: AdminReportComponent
  },
];

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminReportComponent,
  ],
  exports:[],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminPanelModule { }
