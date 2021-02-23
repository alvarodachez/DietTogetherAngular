import { Component, OnInit } from '@angular/core';
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

  constructor(private logInService: LogInService) {
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
      
      Toast.fire({
        icon: 'success',
        title: 'Bienvenid@ '+this.userSignUpDto.username
      })
    })
  }

}
