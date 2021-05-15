import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';
import { PrivateActivityInterface } from '../models/private-activity.interface';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {
  
  endPointServer = '';

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }
  
  getPrivateActivity(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/private-activity/get-private-activity/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver actividad privada activa */
    return this.http.get(endpoint, httpOptions);
  }

  createPrivateActivity(privateActivityForm: PrivateActivityInterface): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/private-activity/create-private-activity/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* crear actividad privada con los datos finales para el backend */
    return this.http.post(endpoint, privateActivityForm, httpOptions);
  }

  getProgressBar(): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/private-activity/get-progress-bar/' + username;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver el progreso del atleta para la barra de progreso */
    return this.http.get(endpoint, httpOptions);
  }

  getAthleteRanking(): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/get-athlete-ranking/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver atleta activo */
    return this.http.get(endpoint, httpOptions);
  }

  createRegister(register: any): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/private-activity/create-register/' + username;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Crear registro de atleta */
    return this.http.post(endpoint, register, httpOptions);
  }

  getActiveGroup(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver grupo activo */
    return this.http.get(endpoint, httpOptions);
  }

  getOut():Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/private-activity/get-out/' + username;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Crear registro de atleta */
    return this.http.post(endpoint, "getOut", httpOptions);


  }

}
