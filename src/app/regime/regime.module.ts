import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegimeComponent } from './regime/regime.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';

const routes: Routes = [

  {
    path: '',
    component: RegimeComponent,
    canActivate : [CanActivateGuard]
  },
  // {
  //   path: 'welcome',
  //   component: WelcomeGroupComponent,
  //   canActivate : [CanActivateGuard]
  // },
  // {
  //   path: 'management',
  //   component: ManagementGroupComponent,
  //   canActivate : [CanActivateGuard]
  // },
  // {
  //   path: 'groupview',
  //   component: ViewGroupComponent,
  //   canActivate : [CanActivateGuard]
  // }
];

@NgModule({
  declarations: [
    RegimeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class RegimeModule { }
