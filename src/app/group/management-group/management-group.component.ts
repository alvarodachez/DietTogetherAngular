import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { GroupInterface } from '../models/group.interface';
import Swal from 'sweetalert2';

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

  constructor(private groupService: GroupService) {}

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

  
  // resetAddFriendForm() {
  //   this.addFriendForm.reset();
  // }


  // setFriendToSendRequest(friend) {
  //   console.log(friend);
  //   this.searchFriends = [];

  //   this.addFriendForm.setValue({ username: friend });
  // }


  // addFriendToList() {
  //   let username = this.addFriendForm.value.username;

  //   console.log('Lista antes:');
  //   console.log(this.friendsList);

  //   this.friendsList.push(username);
  //   this.addFriendForm.reset();

  //   console.log('Lista después:');
  //   console.log(this.friendsList);
  // }


  // deleteFriendFromList(id: number) {
  //   console.log('Lista antes eliminar:');
  //   console.log(this.friendsList);

  //   delete this.friendsList[id];

  //   console.log('Lista después eliminar:');
  //   console.log(this.friendsList);
  // }


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
    });
  }

  onCheckboxChange(e) {

    if (e.target.checked) {
      // console.log(`añadir amigo ${e.target.checked}`);

      // console.log('Lista antes añadir:');
      // console.log(this.selectedFriendsList);
  
      this.selectedFriendsList.push(e.target.id);

      // console.log('Lista después añadir:');
      // console.log(this.selectedFriendsList);

    } else {
      
      // console.log(`borrar amigo ${e.target.checked}`);

      // console.log('Lista después eliminar:');
      // console.log(this.selectedFriendsList);

      this.selectedFriendsList.splice(this.selectedFriendsList.indexOf(e.target.id), 1);

      // console.log('Lista después eliminar:');
      // console.log(this.selectedFriendsList);
    }
  }


  getFriends() {
    this.groupService.getFriends().subscribe((res) => {
      this.friendsList = res;
      console.log(res);
    });
  }
}
