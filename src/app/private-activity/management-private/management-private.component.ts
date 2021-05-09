import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/entry/services/log-in.service';
import Swal from 'sweetalert2';
import { PrivateActivityInterface } from '../models/private-activity.interface';
import { PrivateService } from '../services/private.service';

@Component({
  selector: 'app-management-private',
  templateUrl: './management-private.component.html',
  styleUrls: ['./management-private.component.scss'],
})
export class ManagementPrivateComponent implements OnInit {
  activityMode: string;
  registerMode: string;

  /* Variable que almacena el formulario de actividad privada */
  privateForm: FormGroup;

  constructor(
    private route: Router,
    private build: FormBuilder,
    private login: LogInService,
    private PrivateService: PrivateService
  ) {}

  ngOnInit(): void {
    this.activityMode = '';
    this.registerMode = '';

    this.login.isUserInSession();
    this.privateForm = this.build.group(
      {
        expireDate: ['', [Validators.required, this.validateGroupExpireDate]],
        weightKilograms: [
          '',
          [
            Validators.required, // requerido
            Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
            Validators.minLength(1), // número mínimo de caracteres, 1
            Validators.maxLength(3), // número máximo de caracteres, 3
            Validators.min(1), // valor mínimo, 1
            Validators.max(300), // valor máximo, 300
          ],
        ],
        weightGrams: [
          '',
          [
            Validators.required, // requerido
            Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
            Validators.minLength(1), // número mínimo de caracteres, 1
            Validators.maxLength(3), // número máximo de caracteres, 3
          ],
        ],
      },
      { validator: this.validateGroupExpireDate('expireDate') }
    );
  }

  changeActivityMode(toChange: string) {
    this.activityMode = toChange;
  }

  changeRegisterMode(toChange: string) {
    this.registerMode = toChange;
  }

  /* Método que valida la fecha de expiración/objetivo */
  private validateGroupExpireDate(control: string) {
    return (formGroup: FormGroup) => {
      const expireDateForm = formGroup.controls[control];

      let weekInMs = 1000 * 60 * 60 * 24 * 7;
      let actualDate = new Date(Date.now());
      let dateLimitOneMonth = new Date(actualDate.getTime() + weekInMs * 4);

      if (new Date(Date.parse(expireDateForm.value)) > dateLimitOneMonth) {
        expireDateForm.setErrors(null);
      } else {
        expireDateForm.setErrors({ passwordMismatch: true });
      }
    };
  }

  /* Método que crea la actividad privada */
  createPrivateActivity() {

    // Se muestra el aviso de carga
    Swal.fire({
      title: 'Espere',
      text: 'Se estan guardando sus datos',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // Se recoge la información del formulario
    let backendForm: PrivateActivityInterface = {
      expireDate: this.privateForm.value.expireDate,
      weightObjective: parseFloat(
        this.privateForm.value.weightKilograms +
          '.' +
          this.privateForm.value.weightGrams
      ),
      privateActivityMode: this.activityMode,
      privateRegisterMode: this.registerMode,
    };

    // Se envía la información al backend, a través del servicio
    this.PrivateService.createPrivateActivity(backendForm).subscribe(
      (group) => {
        Swal.fire({
          title: `Actividad creada`,
          text: 'Registro realizado correctamente.',
          icon: 'success',
          input: undefined,
        });

        this.privateForm.reset();

        this.route.navigate(['/private/privateview']);
        // this.route.navigate(['/private/welcome']);

      },
      (error) => {
        Swal.fire({
          title: 'ERROR',
          text: error.error.message,
          icon: 'error',
          input: undefined,
        });
      }
    );

    console.log(backendForm);
  }
}