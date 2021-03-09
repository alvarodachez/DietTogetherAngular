import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  endPointServer = "";

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }

  getReports(): Observable<any> {

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/report/all';

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* Obtiene todos los reportes */
    return this.http.get(endpoint, httpOptions);
  }

  assignReport(id:any):Observable<any>{

    const username = localStorage.getItem("dietUsernameSession");
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/report/assign-report/'+username+'&&'+id;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    return this.http.post(endpoint,"hola",httpOptions);
  }

  getAssignedReports():Observable<any>{
    const username = localStorage.getItem("dietUsernameSession");
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/report/get-assigned-reports/'+username;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    return this.http.get(endpoint,httpOptions);
  }
}
