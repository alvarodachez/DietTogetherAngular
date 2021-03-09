import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canActivate : [CanActivateGuard] 
  },
];

@NgModule({
  declarations: [
    AdminPanelComponent,
  ],
  exports:[],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminPanelModule { }
