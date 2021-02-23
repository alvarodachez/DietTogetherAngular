import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignUpDto } from '../models/signup-user-dto';
import { SignUpClass } from '../models/singup.class';
import { SignUpService } from '../services/sign-up.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  singUpClass: SignUpClass;

  userSignUpDto: UserSignUpDto;

  constructor(private signUpService: SignUpService, private route: Router) {

    this.singUpClass = new SignUpClass("", "", "");
    this.userSignUpDto = new UserSignUpDto("","");
  }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {

    Swal.fire({
      title: 'Espere',
      text: 'Se estan guardando sus datos',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    console.log(formData);
    this.userSignUpDto.username = formData.username;
    this.userSignUpDto.password = formData.password;

    this.signUpService.userSignUp(this.userSignUpDto).subscribe((response)=>{

      console.log(response);

      localStorage.setItem('dietUsername',response.username);
      Swal.fire({
        title: 'Creado el usuario '+ this.userSignUpDto.username,
        text:'Registro realizado correctamente.',
        icon:'success',
        input:undefined
      });

      this.route.navigate(['athlete']);
    });


  }

}
