import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AthleteDataRegisterComponent } from './athlete-data-register/athlete-data-register.component';

const routes: Routes = [
  {
      path: '',
      children: [
        {
            path: 'welcome',
            component: WelcomeComponent,
          },
          {
            path: 'login',
            component: LogInComponent,
          },
          {
            path: 'signup',
            component: SignUpComponent,
          },
          {
            path: 'athlete',
            component: AthleteDataRegisterComponent,
          },
      ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntryRoutingModule {}
