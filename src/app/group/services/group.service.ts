import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';
import { GroupInterface } from '../models/group.interface';
import { GroupInterfaceDto } from '../models/group.interface-dto';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  endPointDev = "";
  endPointProd = "";

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.endPointDev = urlServer.url;
    } else {
      this.endPointProd = urlServerProd.url;
    }
  }


  // getUsernamesByInitials(initials: string): Observable<any> {
  //   /* Obtener token JWT del usuario actual */
  //   const jwt = localStorage.getItem("dietJwtSession");

  //   /* Dirección del servidor - petición */
  //   const endpoint = this.endPointDev + `/athlete/get-athletes-by-initials/${initials}`;

  //   /* Cabecera necesaria para indicar token JWT */
  //   let httpOptions = {
  //     headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
  //   };

  //   /* obtiene los usuarios, buscando por las iniciales introducidas */
  //   return this.http.get(endpoint, httpOptions);
  // }


  createGroup(groupForm: GroupInterface): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointDev + `/group/create-group/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* crear grupo con los datos finales para el backend */
    return this.http.post(endpoint, groupForm, httpOptions);
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


  getActiveGroup(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointDev + `/athlete/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* Devolver array (string) con los amigos del usuario */
    return this.http.get(endpoint, httpOptions);
  }

  getAthlete(username:string):Observable<any>{
    const jwt = localStorage.getItem("dietJwtSession");

    const endpoint  = this.endPointDev + `/athlete/${username}`;

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    return this.http.get(endpoint, httpOptions);


  }


}
