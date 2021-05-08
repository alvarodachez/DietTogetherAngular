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
  
  getActivePrivateActivity(): Observable<any> {
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

    /* crear grupo con los datos finales para el backend */
    return this.http.post(endpoint, privateActivityForm, httpOptions);
  }

}
