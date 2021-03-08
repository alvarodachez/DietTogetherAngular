import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  searchFriends: any = [];
  userFriends: any = [];
  friendRequests: any = [];
  groupRequests: any = [];

  addFriendForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  constructor(private friendService: FriendsService, private route: Router) { }

  ngOnInit(): void {
    this.getFriends();
    this.getFriendRequests();
    this.getGroupRequests();
  }

  getUsernameByInitials() {

    let selfUsername = localStorage.getItem("dietUsernameSession");
    let auxFriends = [];
    if (this.addFriendForm.value.username != undefined && this.addFriendForm.value.username != "") {

      this.friendService.getUsernamesByInitials(this.addFriendForm.value.username).subscribe(res => {
        console.log(res);

        auxFriends = res;

        for(let username of this.userFriends){

          if(auxFriends.includes(username)){
            auxFriends.splice(auxFriends.indexOf(username),1);
          }

          if(auxFriends.includes(selfUsername)){
            auxFriends.splice(auxFriends.indexOf(selfUsername),1);
          }
        }
        this.searchFriends = auxFriends;


      })
    } else {
      this.searchFriends = [];
    }

  }

  setFriendToSendRequest(friend) {

    console.log(friend);
    this.searchFriends = [];

    this.addFriendForm.setValue({ username: friend })
  }

  getFriends() {
    
    
    this.friendService.getFriends().subscribe(res => {
      
      this.userFriends = res;
    })
  }


  getFriendRequests() {
    this.friendService.getFriendRequests().subscribe(res => {
      let aux = [];

      for (const request in res) {
        if (res[request].requestStatus == 'PENDING') {
          aux.push(res[request]);
        }
      }

      this.friendRequests = aux;
    })
  }

  getGroupRequests() {
    this.friendService.getGroupRequests().subscribe(res => {
      let aux = [];

      for (const request in res) {
        if (res[request].requestStatus == 'PENDING') {
          aux.push(res[request]);
        }
      }

      this.groupRequests = aux;
    })
  }


  sendFriendRequest(username: string) {

    Swal.fire({
      title: 'Espere',
      text: 'Se esta mandando su solicitud',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.friendService.sendFriendRequest(username).subscribe(res => {
      console.log(res);

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
      });

      this.getFriendRequests();

      Toast.fire({
        icon: 'success',
        title: 'Se ha enviado la solicitud a ' + username
      });

      this.resetAddFriendForm();

    });
  }

  resetAddFriendForm() {
    /* Borrar la lista de amigos, para que no aparezcan amigos ya agregados al abrir el modal */
    this.searchFriends = [];

    /* Resetear el formulario de añadir amigos */
    this.addFriendForm.reset();
  }


  acceptFriendRequest(idRequest: any) {

    Swal.fire({
      title: 'Espere',
      text: 'Se esta aceptando la solicitud',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    this.friendService.acceptFriendRequest(idRequest).subscribe(res => {

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

      this.getFriends();
      this.getFriendRequests();

      Toast.fire({
        icon: 'success',
        title: 'Solicitud de amistad aceptada'
      })
    });
  }

  acceptGroupRequest(idRequest: any) {
    Swal.fire({
      title: 'Espere',
      text: 'Se esta aceptando la solicitud',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    this.friendService.acceptGroupRequest(idRequest).subscribe(res => {

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


      this.getGroupRequests();

      Toast.fire({
        icon: 'success',
        title: 'Solicitud de grupo aceptada'
      })
    });
  }


  rejectFriendRequest(idRequest: any) {

    Swal.fire({
      title: 'Espere',
      text: 'Se esta rechazando la solicitud',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    this.friendService.rejectFriendRequest(idRequest).subscribe(res => {

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

      this.getFriends();
      this.getFriendRequests();

      Toast.fire({
        icon: 'success',
        title: 'Solicitud de amistad rechazada'
      })
    });
  }

  rejectGroupRequest(idRequest: any) {
    Swal.fire({
      title: 'Espere',
      text: 'Se esta rechazando la solicitud',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    this.friendService.rejectGroupRequest(idRequest).subscribe(res => {

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


      this.getGroupRequests();

      Toast.fire({
        icon: 'success',
        title: 'Solicitud de grupo rechazada'
      })
    });
  }

}
