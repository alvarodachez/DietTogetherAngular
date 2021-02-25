import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlServerProd } from '../../../environments/environment.prod';
import { environment, urlServer } from 'src/environments/environment';
import { UserSignUpDto } from '../models/signup-user-dto';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  endPointDev = "";
  endPointProd = "";

  constructor(private http: HttpClient) {

    if (!environment.production) {
      this.endPointDev = urlServer.url;
    } else {
      this.endPointProd = urlServerProd.url;
    }
  }


  login(user: UserSignUpDto): Observable<any> {
    const endpoint = this.endPointDev + '/user/login';

    console.log(endpoint);
    console.log(user);
    return this.http.post(endpoint, user,{responseType:'text'});
  }

  logout(): void {
    localStorage.removeItem("dietUsernameSession");
    localStorage.removeItem("dietJwtSession");
  }
}

