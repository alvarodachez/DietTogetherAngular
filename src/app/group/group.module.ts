import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeGroupComponent } from './welcome-group/welcome-group.component';
import { ManagementGroupComponent } from './management-group/management-group.component';

const routes: Routes = [

  {
    path: 'welcome-group',
    component: WelcomeGroupComponent,
  },

  {
    path: 'management-group',
    component: ManagementGroupComponent,
  },
];

@NgModule({
  declarations: [WelcomeGroupComponent, ManagementGroupComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
})
export class GroupModule { }
