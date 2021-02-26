import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  endPointDev = "";
  endPointProd = "";

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.endPointDev = urlServer.url;
    } else {
      this.endPointProd = urlServerProd.url;
    }
  }

  getUsernamesByInitials(initials: string): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointDev + `/athlete/get-athletes-by-initials/${initials}`;

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
    const endpoint = this.endPointDev + `/athlete/get-friends/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* Devolver array (string) con los amigos del usuario */
    return this.http.get(endpoint, httpOptions);
  }


  getFriendRequests(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointDev + `/athlete/get-friends-request/${username}`;

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
    const endpoint = this.endPointDev + `/athlete/send-friend-request/${username}&&${friend}`;

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
    const endpoint = this.endPointDev + `/athlete/accept-friend-request/${idRequest}`;

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
    const endpoint = this.endPointDev + `/athlete/reject-friend-request/${idRequest}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* rechazar solicitud de amistad */
    return this.http.post(endpoint, "", httpOptions);
  }

}