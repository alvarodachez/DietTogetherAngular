import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';
import { AdminReportInterface } from '../models/admin-report.interface';
import { LogInService } from '../../entry/services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  endPointServer = "";

  constructor(private http: HttpClient, private login:LogInService) {
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }

  getReports(): Observable<any> {
    this.login.isUserInSession();

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
    this.login.isUserInSession();

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
    this.login.isUserInSession();
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



  /* Método que obtiene un reporte, indicando el id */
  getOneReport(id: string) {
    this.login.isUserInSession();
    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/report/get-report/${id}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* Obtiene el reporte con el id indicado */
    return this.http.get(endpoint, httpOptions);
  }


  updateReportAnnotation(id:any, annotations: string):Observable<any>{
    this.login.isUserInSession();
    /* Obtener el usuario actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/report/set-admin-annotation/'+username+'&&'+id;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* Petición que actualiza las anotaciones de administrador */
    return this.http.post(endpoint, annotations ,httpOptions);
  }


  setReportResolved(id:any):Observable<any>{
    this.login.isUserInSession();
    /* Obtener el usuario actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/report/set-resolved-status/'+username+'&&'+id;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* Petición que establece el reporte como resuelto */
    return this.http.post(endpoint, "resolved" ,httpOptions);
  }


  setReportPending(id:any):Observable<any>{
    this.login.isUserInSession();
    /* Obtener el usuario actual */
    const username = localStorage.getItem("dietUsernameSession");

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + '/report/set-pending-status/'+username+'&&'+id;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* Petición que establece el reporte como pendiente */
    return this.http.post(endpoint, "pending" ,httpOptions);
  }

}
