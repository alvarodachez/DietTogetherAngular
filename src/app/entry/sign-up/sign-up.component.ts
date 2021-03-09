import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class SignUpComponent implements OnInit, AfterViewInit {

  /* Se crea variable para aplicar foco en el primer campo del formulario */
  @ViewChild('userFocus') userFocus: ElementRef;

  singUpClass: SignUpClass;
  userSignUpDto: UserSignUpDto;

  /* Variable utilizada para ocultar la contraseña */
  hidePass = true;
  hideRepeatPass = true;

  constructor(private signUpService: SignUpService, private route: Router) {

    this.singUpClass = new SignUpClass("", "", "");
    this.userSignUpDto = new UserSignUpDto("","");
  }

  /* Se aplica foco en el primer campo del formulario */
  ngAfterViewInit(): void {
    this.userFocus.nativeElement.focus();
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
    }, error => {
      Swal.fire({
        title: "ERROR",
        text: error.error.message,
        icon:'error',
        input:undefined
      });
    });


  }

}
