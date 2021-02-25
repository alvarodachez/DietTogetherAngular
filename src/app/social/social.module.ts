import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsComponent,
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
  ]
})
export class SocialModule { }
