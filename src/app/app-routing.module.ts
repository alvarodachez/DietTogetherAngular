import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthleteDataRegisterComponent } from './entry/athlete-data-register/athlete-data-register.component';
import { LogInComponent } from './entry/log-in/log-in.component';
import { SignUpComponent } from './entry/sign-up/sign-up.component';
import { WelcomeComponent } from './entry/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'login', component: LogInComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'athlete', component: AthleteDataRegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
