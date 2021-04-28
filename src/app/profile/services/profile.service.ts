import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  endPointServer = '';

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }

  getAthlete(): Observable<any> {
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

  updateProfileData(data: any): Observable<any> {
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer + `/athlete/update-profile-data/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* Devolver grupo activo */
    return this.http.put(endpoint, data);
  }
}
