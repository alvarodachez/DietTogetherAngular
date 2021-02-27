import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeGroupComponent } from './welcome-group/welcome-group.component';

const routes: Routes = [

  {
    path: 'welcome-group',
    component: WelcomeGroupComponent,
  },
];

@NgModule({
  declarations: [WelcomeGroupComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
})
export class GroupModule { }
