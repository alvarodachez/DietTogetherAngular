import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './home/home.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate : [CanActivateGuard]
  },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
