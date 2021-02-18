import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Componentes
import { AthleteDataRegisterComponent } from './athlete-data-register/athlete-data-register.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
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
];

@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent,
    WelcomeComponent,
    AthleteDataRegisterComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ],
})
export class EntryModule {}
