import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlServerProd } from '../../../environments/environment.prod';
import { environment, urlServer } from 'src/environments/environment';
import { UserSignUpDto } from '../models/signup-user-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

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
      localStorage.setItem("dietUsernameSession",user.username);
      localStorage.setItem("dietJwtSession",response);
      this.route.navigate(["home"]);
      setTimeout( () =>{

        Toast.fire({
          icon: 'success',
          title: 'Bienvenid@ '+user.username
        })
        location.reload();
        
      },10)
  
      
    })
    
    //return this.http.post(endpoint, user,{responseType:'text'});
  }

  logout(): void {
    localStorage.removeItem("dietUsernameSession");
    localStorage.removeItem("dietJwtSession");

    this.route.navigate(["welcome"])
    setTimeout( () =>{

      location.reload();
    },10)
  }
}

