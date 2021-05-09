import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Componentes
import { WelcomePrivateComponent } from './welcome-private/welcome-private.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';
import { ViewPrivateComponent } from './view-private/view-private.component';
import { ManagementPrivateComponent } from './management-private/management-private.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePrivateComponent,
    canActivate : [CanActivateGuard]
  },
  {
    path: 'welcome',
    component: WelcomePrivateComponent,
    canActivate : [CanActivateGuard]
  },
  {
    path: 'management',
    component: ManagementPrivateComponent,
    canActivate : [CanActivateGuard]
  },
  {
    path: 'privateview',
    component: ViewPrivateComponent,
    canActivate : [CanActivateGuard]
  }
];


@NgModule({
  declarations: [
    WelcomePrivateComponent,
    ViewPrivateComponent,
    ManagementPrivateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ],
  providers:[
    DatePipe
  ]
})
export class PrivateModule { }
