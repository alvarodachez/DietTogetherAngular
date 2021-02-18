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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
