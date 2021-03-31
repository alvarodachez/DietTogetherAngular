import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { WelcomeComponent } from './entry/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: '',
    loadChildren: () => import("./entry/entry.module").then(m => m.EntryModule)
    /* Entry Module */
      // path: 'welcome',
      // path: 'login',
      // path: 'signup',
      // path: 'athlete',
  },
  {
    path: 'home',
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path: 'social',
    loadChildren: () => import("./social/social.module").then(m => m.SocialModule)
  },
  {
    path: 'group',
    loadChildren: () => import("./group/group.module").then(m => m.GroupModule)
  },
  {
    path: 'report',
    loadChildren: () => import("./report/report.module").then(m => m.ReportModule)
  },
  {
    path:'admin-panel',
    loadChildren: () => import("./admin-panel/admin-panel.module").then(m => m.AdminPanelModule)
  },
  {
    path:'regime',
    loadChildren: () => import("./regime/regime.module").then(m => m.RegimeModule)
  },
  {
    path:'**',
    component: NotFoundComponent
  },
  {
    path:'404',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
