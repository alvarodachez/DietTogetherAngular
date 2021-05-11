import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AthleteDtoClass } from '../models/athlete-dto';
import { AthleteClass } from '../models/athlete.class';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-athlete-data-register',
  templateUrl: './athlete-data-register.component.html',
  styleUrls: ['./athlete-data-register.component.scss'],
})
export class AthleteDataRegisterComponent implements OnInit, AfterViewInit {

  /* Se crea variable para aplicar foco en el primer campo del formulario */
  @ViewChild('nameFocus') nameFocus: ElementRef;

  /* Variable que almacena los datos del atleta, para enviar al backend */
  loginAthleteDto: AthleteDtoClass;

  athleteForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
    weightKilograms: new FormControl('', [
      Validators.required,            // requerido
      Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
      Validators.minLength(1),        // número mínimo de caracteres, 1
      Validators.maxLength(3),        // número máximo de caracteres, 3
      Validators.min(1),              // valor mínimo, 1
      Validators.max(300),            // valor máximo, 300
    ]),
    weightGrams: new FormControl('', [
      Validators.required,            // requerido
      Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
      Validators.minLength(1),        // número mínimo de caracteres, 1
      Validators.maxLength(3),        // número máximo de caracteres, 3
    ]),
    heightMeters: new FormControl('', [
      Validators.required,            // requerido
      Validators.pattern('^[1-2]*$'), // números válidos, 1 y 2
      Validators.minLength(1),        // número mínimo de caracteres, 1
      Validators.maxLength(1),        // número máximo de caracteres, 1
    ]),
    heightCentimeters: new FormControl('', [
      Validators.required,            // requerido
      Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
      Validators.minLength(1),        // número mínimo de caracteres, 1
      Validators.maxLength(2),        // número máximo de caracteres, 2
    ]),
  });

  constructor(private signUpService: SignUpService, private route: Router) { }

  /* Se aplica foco en el primer campo del formulario */
  ngAfterViewInit(): void {
    // this.nameFocus.nativeElement.focus();
  }  

  ngOnInit(): void {}

  sendAthleteData() {
    /* Mostrar aviso - cargando */
    Swal.fire({
      title: 'Espere',
      text: 'Se estan guardando sus datos',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    /* inicializar loginAthleteDto */
    this.loginAthleteDto = new AthleteDtoClass('', '', 0, 0);

    /* introducir los datos del formulario en loginAthleteDto */
    this.loginAthleteDto.name = this.athleteForm.value.name;
    this.loginAthleteDto.surname = this.athleteForm.value.surname;
    this.loginAthleteDto.weight = parseFloat(
      this.athleteForm.value.weightKilograms + '.' + this.athleteForm.value.weightGrams
    );
    this.loginAthleteDto.height = parseFloat(
      this.athleteForm.value.heightMeters + '.' + this.athleteForm.value.heightCentimeters
    );
    this.loginAthleteDto.birthDay = this.athleteForm.value.birthDay;


    /* realizar petición para registrar los datos del atleta */
    this.signUpService
      .athleteDataSign(this.loginAthleteDto)
      .subscribe((response) => {
        Swal.fire({
          title: 'Registro de datos',
          text: 'Datos registrados correctamente.',
          icon: 'success',
          input: undefined,
        });
        this.route.navigate(['login']);
      });
  }


}