import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { WelcomeGroupComponent } from './welcome-group/welcome-group.component';
import { ManagementGroupComponent } from './management-group/management-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

const routes: Routes = [

  {
    path: '',
    component: WelcomeGroupComponent,
  },
  {
    path: 'welcome',
    component: WelcomeGroupComponent,
  },
  {
    path: 'management',
    component: ManagementGroupComponent,
  },
  {
    path: 'groupview',
    component: ViewGroupComponent
  }
];

@NgModule({
  declarations: [
    WelcomeGroupComponent,
    ManagementGroupComponent,
    ViewGroupComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
})
export class GroupModule { }
