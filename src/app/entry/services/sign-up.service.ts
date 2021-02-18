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

  endPointDev = "";
  endPointProd = "";
  constructor(private http: HttpClient) {

    if (!environment.production) {
      this.endPointDev = urlServer.url;
    } else {
      this.endPointProd = urlServerProd.url;
    }
  }


  userSignUp(user: UserSignUpDto): Observable<any> {

    const endpoint = this.endPointDev + '/user/sign-up';

    return this.http.post(endpoint, user);

  }

  athleteDataSign(athleteDto: AthleteDtoClass): Observable<any> {

    const endpoint = this.endPointDev + '/athlete/sign-up-data/' + localStorage.getItem('dietUsername');

    return this.http.post(endpoint, athleteDto);
  }
}



