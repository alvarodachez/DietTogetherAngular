import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './entry/welcome/welcome.component';

const routes: Routes = [

  /* Entry Module */
    // path: 'welcome',
    // path: 'login',
    // path: 'signup',
    // path: 'athlete',
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: '',
    loadChildren: () => import("./entry/entry.module").then(m => m.EntryModule)
  },
  {
    path: 'home',
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
