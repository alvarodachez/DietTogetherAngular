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

    this.logInService.login(this.userSignUpDto).subscribe(response => {
      console.log(response);

      localStorage.setItem("dietUsernameSession",response.username);
      //console.log(response.headers.get('Authorization'));
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      // Redirigir a home, una vez logeado
      this.route.navigate(["home"]);

      Toast.fire({
        icon: 'success',
        title: 'Bienvenid@ '+this.userSignUpDto.username
      })
    },err => {
      console.log(err)
    })
  }

}
