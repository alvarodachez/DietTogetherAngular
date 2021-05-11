import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
    canActivate : [CanActivateGuard]
  },
];

@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
