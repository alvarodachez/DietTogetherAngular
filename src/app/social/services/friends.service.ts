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
}
