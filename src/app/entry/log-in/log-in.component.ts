import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginClass } from '../models/login.class';
import { UserSignUpDto } from '../models/signup-user-dto';
import { LogInService } from '../services/log-in.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginUser: LoginClass;

  userSignUpDto: UserSignUpDto;

  routeRedirect = '';

  constructor(private logInService: LogInService, private route: Router) {
    this.loginUser = new LoginClass("", "");
    this.userSignUpDto = new UserSignUpDto("", "");
  }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    console.log(formData);
    Swal.fire({
      title: 'Espere',
      text: 'Ingresando en la aplicacion.',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    this.userSignUpDto.username = formData.username;
    this.userSignUpDto.password = formData.password;

    this.logInService.login(this.userSignUpDto);
    this.logInService.urlUsuarioIntentaAcceder = '';
    this.route.navigate([this.routeRedirect]);
  }

}
