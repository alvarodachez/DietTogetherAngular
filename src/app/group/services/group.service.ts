import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';
import { GroupInterface } from '../models/group.interface';
import { LogInService } from '../../entry/services/log-in.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  endPointServer = '';

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }

  /**
   * Metodo para verificar un registro
   * @param id
   * @returns
   */
  verifyRegister(id: any): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer + `/register/verify-register/${username}&&${id}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* enviar petición al backend */
    return this.http.post(endpoint, 'holi', httpOptions);
  }

  /**
   * Metodo para denegar un registro
   * @param id
   * @returns
   */
  declineRegister(id: any): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer + `/register/decline-register/${username}&&${id}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* enviar petición al backend */
    return this.http.post(endpoint, 'holi', httpOptions);
  }

  getRegistersToVerify(): Observable<any> {

    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer + `/register/get-registers-to-verify/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* enviar petición al backend */
    return this.http.get(endpoint, httpOptions);
  }

  createGroup(groupForm: GroupInterface): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/group/create-group/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* crear grupo con los datos finales para el backend */
    return this.http.post(endpoint, groupForm, httpOptions);
  }

  getFriends(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/get-friends/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver array (string) con los amigos del usuario */
    return this.http.get(endpoint, httpOptions);
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

  getAthlete(username: string): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/athlete/get-athlete-ranking/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver atleta activo */
    return this.http.get(endpoint, httpOptions);
  }

  getRegisters(): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer +
      '/register/get-registers/' +
      localStorage.getItem('dietUsernameSession');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver los registros del atleta */
    return this.http.get(endpoint, httpOptions);
  }

  createRegister(register: any): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer +
      '/register/create-register/' +
      localStorage.getItem('dietUsernameSession');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Crear registro de atleta */
    return this.http.post(endpoint, register, httpOptions);
  }

  getProgressBar(): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer +
      '/group/get-progress-bar/' +
      localStorage.getItem('dietUsernameSession');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver el progreso del atleta para la barra de progreso */
    return this.http.get(endpoint, httpOptions);
  }

  getOutGroup(): Observable<any> {
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer +
      '/group/get-out-group/' +
      localStorage.getItem('dietUsernameSession');

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* enviar petición al backend */
    return this.http.post(endpoint, 'hola', httpOptions);
  }

  getChartTotalRegisters(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/chart/get-group-total-register/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver grupo activo */
    return this.http.get(endpoint, httpOptions);
  }

  getChartPoints(): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/chart/get-group-points/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver grupo activo */
    return this.http.get(endpoint, httpOptions);
  }
}
