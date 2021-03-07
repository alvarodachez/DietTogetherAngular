import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSignUpDto } from '../models/signup-user-dto';
import { Observable } from 'rxjs';
import { urlServerProd } from '../../../environments/environment.prod';
import { environment, urlServer } from 'src/environments/environment';
import { AthleteDtoClass } from '../models/athlete-dto';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  endPointServer = "";

  
  constructor(private http: HttpClient) {
    /* especificar ip del servidor, para entorno local o producción */
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }


  userSignUp(user: UserSignUpDto): Observable<any> {
    /* definir ruta del endpoint */
    const endpoint = this.endPointServer + '/user/sign-up';

    /* realizar petición, registrar usuario */
    return this.http.post(endpoint, user);
  }

  
  athleteDataSign(athleteDto: AthleteDtoClass): Observable<any> {
    /* definir ruta del endpoint */
    const endpoint = this.endPointServer + '/athlete/sign-up-data/' + localStorage.getItem('dietUsername');

    /* realizar petición, registrar datos del atleta */
    return this.http.post(endpoint, athleteDto);
  }
}



