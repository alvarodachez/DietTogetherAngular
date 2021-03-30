import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';
import { ReportInterface } from '../models/report.interface';
import { LogInService } from '../../entry/services/log-in.service';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  /* Variable que guarda el endpoint correspondiente (desarrollo o producción) */
  endPointServer = '';

  constructor(private http: HttpClient, private login:LogInService) {

    /* Se establece el endpoint (desarrollo o producción) */
    this.setEndpoint();
  }


  /* Método que crea el reporte */
  createReport(reportForm: ReportInterface): Observable<any> {
    this.login.isUserInSession();
    /* Obtener usuario de la sesión actual */
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/report/create-report/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* crear reporte con los datos finales para el backend */
    return this.http.post(endpoint, reportForm, httpOptions);
  }


  /* Método que establece el endpoint correspondiente */
  setEndpoint() {
    this.login.isUserInSession();
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }

}
