import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { GroupInterface } from '../models/group.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LogInService } from '../../entry/services/log-in.service';

@Component({
  selector: 'app-management-group',
  templateUrl: './management-group.component.html',
  styleUrls: ['./management-group.component.scss'],
})
export class ManagementGroupComponent implements OnInit {
  /* Variable usada para mostrar una pestaña u otra */
  showTraditional: boolean;

  /* Variable que almacena la lista de amigos */
  friendsList: any = [];

  /* Variable que almacena la lista de amigos seleccionados */
  selectedFriendsList: any = [];

  /* Variable que almacena el grupo creado */
  groupForm: FormGroup;

  constructor(
    private groupService: GroupService,
    private route: Router,
    private build: FormBuilder,
    private login:LogInService,
  ) {}

  ngOnInit(): void {

    this.login.isUserInSession();
    this.groupForm = this.build.group(
      {
        name: ['', Validators.required],
        expireDate: ['', [Validators.required, this.validateGroupExpireDate]],
      },
      { validator: this.validateGroupExpireDate('expireDate') }
    );

    this.showTraditional = true;
    this.getFriends();

    
  }

  
  /* Método que establece la pestaña tradicional */
  changeTradicional() {
    this.showTraditional = true;
  }


  /* Método que establece la pestaña objetivo */
  changeObjetivo() {
    this.showTraditional = false;
  }


  /* Crear grupo de atletas */
  createGroup(): void {
    this.login.isUserInSession();
    
    Swal.fire({
      title: 'Espere',
      text: 'Se estan guardando sus datos',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    /* Crear objeto para enviarlo al backend */
    let backendForm: GroupInterface = {
      name: this.groupForm.value.name,
      expireDate: this.groupForm.value.expireDate,
      athletes: this.selectedFriendsList,
      enabled: true,
      challengeType: 'TRADITIONAL',
    };

    /* Realizar petición al backend, a través del servicio */
    this.groupService.createGroup(backendForm).subscribe(
      (group) => {
        Swal.fire({
          title: `Grupo ${backendForm.name}`,
          text: 'Registro realizado correctamente.',
          icon: 'success',
          input: undefined,
        });

        this.groupForm.reset();

        this.route.navigate(['/group/groupview']);
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
  }


  /* Método que gestiona el checkbox de amigos */
  onCheckboxChange(e) {
    if (e.target.checked) {
      /* Añadir amigo a la lista de amigos seleccionados */
      this.selectedFriendsList.push(e.target.id);
    } else {
      /* Eliminar amigo de la lista de amigos seleccionados */
      this.selectedFriendsList.splice(
        this.selectedFriendsList.indexOf(e.target.id),
        1
      );
    }
  }


  /* Método que obtiene la lista de amigos y almacena la lista en friendsList */
  getFriends() {
    this.login.isUserInSession();
    this.groupService.getFriends().subscribe((res) => {
      this.friendsList = res;
    });
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
}
