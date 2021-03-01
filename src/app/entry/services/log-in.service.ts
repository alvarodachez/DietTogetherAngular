import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { urlServerProd } from '../../../environments/environment.prod';
import { environment, urlServer } from 'src/environments/environment';
import { UserSignUpDto } from '../models/signup-user-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  endPointDev = "";
  endPointProd = "";

  constructor(private http: HttpClient, private route: Router) {

    if (!environment.production) {
      this.endPointDev = urlServer.url;
    } else {
      this.endPointProd = urlServerProd.url;
    }
  }


  login(user: UserSignUpDto):void {
    const endpoint = this.endPointDev + '/user/login';

    this.http.post(endpoint, user,{responseType:'text'}).subscribe(response => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      // Redirigir a home, una vez logeado
      localStorage.setItem(this.ISLOGGEDKEY,'true');
      this.changeLoginStatusSubject.next(true);
      localStorage.setItem("dietUsernameSession",user.username);
      localStorage.setItem("dietJwtSession",response);
      this.route.navigate(["home"]);
      setTimeout( () =>{

        Toast.fire({
          icon: 'success',
          title: 'Bienvenid@ '+user.username
        })
        
      },10)
  
      
    })
    
    //return this.http.post(endpoint, user,{responseType:'text'});
  }

  logout(): void {
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
    localStorage.removeItem("dietUsernameSession");
    localStorage.removeItem("dietJwtSession");

    this.route.navigate(["welcome"])
    setTimeout( () =>{

      //location.reload();
    },10)
  }

  isLoggedIn(url:string){
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);

    if(!isLogged){
      this.urlUsuarioIntentaAcceder = url;

      return false;
    }

    return true;
  }
}

