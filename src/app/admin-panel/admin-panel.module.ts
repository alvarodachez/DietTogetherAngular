import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';
import { AdminGuard } from '../entry/services/admin.guard';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canActivate : [CanActivateGuard, AdminGuard] 
  },
];

@NgModule({
  declarations: [
    AdminPanelComponent,
  ],
  exports:[],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminPanelModule { }
