import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AthleteDataRegisterComponent } from './athlete-data-register/athlete-data-register.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent,
    WelcomeComponent,
    AthleteDataRegisterComponent,
  ],
  exports: [
    LogInComponent,
    SignUpComponent,
    WelcomeComponent,
    AthleteDataRegisterComponent,
  ],
  imports: [CommonModule],
})
export class EntryModule {}
