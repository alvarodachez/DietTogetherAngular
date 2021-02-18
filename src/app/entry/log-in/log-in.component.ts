import { Component, OnInit } from '@angular/core';
import { LoginClass } from '../models/login.class';
import { UserSignUpDto } from '../models/signup-user-dto';
import { LogInService } from '../services/log-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginUser: LoginClass;

  userSignUpDto: UserSignUpDto;

  constructor(private logInService: LogInService) {
    this.loginUser = new LoginClass("", "");
    this.userSignUpDto = new UserSignUpDto("", "");
  }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    console.log(formData);
    this.userSignUpDto.username = formData.username;
    this.userSignUpDto.password = formData.password;

    this.logInService.login(this.userSignUpDto).subscribe(response => {
      console.log(response);
    })
  }

}
