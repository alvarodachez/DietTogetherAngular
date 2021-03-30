import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FriendsService } from '../services/friends.service';
import { LogInService } from '../../entry/services/log-in.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  /**
   * VARIABLES QUE SE USAN EN EL COMPONENTE
   */
  // Amigos que se obtienen en la busqueda del modal de solicitudes de amistad
  searchFriends: any = [];
  // Amigos del usuario logeado
  userFriends: any = [];
  // Solicitudes de amistad del usuario logeado
  friendRequests: any = [];
  // Solicitudes de grupo del usuario logeado
  groupRequests: any = [];

  /**
   * FORMULARIO REACTIVO CON EL USUARIO PARA MANDAR SOLICITUDES DE AMISTAD
   */
  addFriendForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  constructor(private friendService: FriendsService, private route: Router,private login:LogInService) { }

  ngOnInit(): void {
    this.login.isUserInSession();
    /**
     * Funcion para obtener los amigos del usuario logeado
     */
    this.getFriends();
    /**
     * Funcion para obtener las solicitudes de amistad del usuario logeado
     */
    this.getFriendRequests();
    /**
     * Funcion para obtener las solicitudes de grupo del usuario logeado
     */
    this.getGroupRequests();
  }

  /**
   * Obtener usuarios por sus iniciales. Solo te aparecen si no son tus amigos
   */
  getUsernameByInitials() {

    let selfUsername = localStorage.getItem("dietUsernameSession");
    let auxFriends = [];
    if (this.addFriendForm.value.username != undefined && this.addFriendForm.value.username != "") {

      this.friendService.getUsernamesByInitials(this.addFriendForm.value.username).subscribe(res => {
        

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

  /**
   * Rellenar valor del formulario con el amigo seleccionado en la busqueda
   * @param friend 
   */
  setFriendToSendRequest(friend) {

    
    this.searchFriends = [];

    this.addFriendForm.setValue({ username: friend })
  }

  /**
   * Funcion para obtener los amigos del usuario logeado
   */
  getFriends() {
    
    
    this.friendService.getFriends().subscribe(res => {
      
      this.userFriends = res;
    })
  }


  /**
   * Funcion para obtener las solicitudes de amistad del usuario logeado
   */
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

  /**
   * Funcion para obtener las solicitudes de grupo del usuario logeado
   */
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


  /**
   * Funcion para mandar una solicitud de amistad al usuario seleccionado
   * @param username 
   */
  sendFriendRequest(username: string) {

    Swal.fire({
      title: 'Espere',
      text: 'Se esta mandando su solicitud',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.friendService.sendFriendRequest(username).subscribe(res => {
      

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

    }, error => {

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

      Toast.fire({
        icon: 'error',
        title: error.error.message
      });

    });
  }

  /**
   * Funcion que resetea los valores del formulario en el modal de mandar solicitudes de amistad
   */
  resetAddFriendForm() {
    /* Borrar la lista de amigos, para que no aparezcan amigos ya agregados al abrir el modal */
    this.searchFriends = [];

    /* Resetear el formulario de añadir amigos */
    this.addFriendForm.reset();
  }


  /**
   * Aceptar la solicitud de amistad
   * @param idRequest 
   */
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

  /**
   * Aceptar la solicitud de grupo
   * @param idRequest 
   */
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
    }, error => {
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
        icon: 'error',
        title: error.error.message
      });
    });
  }


  /**
   * Rechazar la solicitud de amistad
   * @param idRequest 
   */
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

  /**
   * Rechazar la solicitud de grupo
   * @param idRequest 
   */
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
