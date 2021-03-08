import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  endPointServer = "";
  

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }

  getUsernamesByInitials(initials: string): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/get-athletes-by-initials/${initials}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* obtiene los usuarios, buscando por las iniciales introducidas */
    return this.http.get(endpoint, httpOptions);
  }

  getFriends(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/get-friends/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* Devolver array (string) con los amigos del usuario */
    return this.http.get(endpoint, httpOptions);
  }

  getGroupRequests(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/group/get-group-request/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* obtener las solicitudes de amistad */
    return this.http.get(endpoint, httpOptions);
  }

  getFriendRequests(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/get-friends-request/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* obtener las solicitudes de amistad */
    return this.http.get(endpoint, httpOptions);
  }


  sendFriendRequest(friend: string): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/send-friend-request/${username}&&${friend}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* enviar solicitud de amistad */
    return this.http.post(endpoint, "", httpOptions);
  }


  acceptFriendRequest(idRequest: any): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/accept-friend-request/${idRequest}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* aceptar solicitud de amistad */
    return this.http.post(endpoint, "", httpOptions);
  }

  acceptGroupRequest(idRequest: any): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/group/accept-group-request/${idRequest}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* aceptar solicitud de amistad */
    return this.http.post(endpoint, "", httpOptions);
  }


  rejectFriendRequest(idRequest: any): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/reject-friend-request/${idRequest}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* rechazar solicitud de amistad */
    return this.http.post(endpoint, "", httpOptions);
  }

  rejectGroupRequest(idRequest: any): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/group/reject-group-request/${idRequest}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* rechazar solicitud de amistad */
    return this.http.post(endpoint, "", httpOptions);
  }

}