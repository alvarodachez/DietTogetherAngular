import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { FriendsComponent } from './friends/friends.component';
import { CanActivateGuard } from '../entry/services/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: FriendsComponent,
    canActivate : [CanActivateGuard]
  },
];

@NgModule({
  declarations: [
    FriendsComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SocialModule { }
