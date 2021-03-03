import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { GroupInterface } from '../models/group.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-group',
  templateUrl: './management-group.component.html',
  styleUrls: ['./management-group.component.scss'],
})
export class ManagementGroupComponent implements OnInit {
  showTraditional: boolean;

  searchFriends: any = [];
  // userFriends: any = [];
  friendsList: any = [];
  selectedFriendsList: any = [];

  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    expireDate: new FormControl('', Validators.required),
  });

  addFriendForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  constructor(private groupService: GroupService, private route:Router) {}

  ngOnInit(): void {
    this.showTraditional = true;
    this.getFriends();
  }

  changeTradicional() {
    this.showTraditional = true;
  }

  changeObjetivo() {
    this.showTraditional = false;
  }


  /* Crear grupo de atletas */
  createGroup(): void {

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

    console.log(backendForm);

    /* Realizar petición al backend, a través del servicio */
    this.groupService.createGroup(backendForm).subscribe((group) => {
      console.log('group - creado');
      console.log(group);

      Swal.fire({
        title: `Grupo ${backendForm.name}`,
        text:'Registro realizado correctamente.',
        icon:'success',
        input:undefined
      });

      this.groupForm.reset();

      this.route.navigate(['/group/groupview'])
    });
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      /* Añadir amigo a la lista de amigos seleccionados */
      this.selectedFriendsList.push(e.target.id);
    } else {
      /* Eliminar amigo de la lista de amigos seleccionados */
      this.selectedFriendsList.splice(this.selectedFriendsList.indexOf(e.target.id), 1);
    }
  }


  getFriends() {
    this.groupService.getFriends().subscribe((res) => {
      this.friendsList = res;
      console.log(res);
    });
  }
}
