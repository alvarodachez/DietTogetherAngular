import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { urlServerProd } from '../../../environments/environment.prod';
import { environment, urlServer } from 'src/environments/environment';
import { UserSignUpDto } from '../models/signup-user-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupService } from '../../group/services/group.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  readonly ISLOGGEDKEY = 'islogged';
  readonly ISADMINKEY = 'isadmin';
  public urlUsuarioIntentaAcceder = '';

  public adminIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  public changeAdminStatusSubject = new Subject<boolean>();
  public changeAdminStatus$ = this.changeAdminStatusSubject.asObservable();

  endPointServer = '';

  atletaRegister: any;

  constructor(
    private http: HttpClient,
    private route: Router,
    private groupService: GroupService
  ) {
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }

  login(user: UserSignUpDto): void {
    const endpoint = this.endPointServer + '/user/login';

    this.http.post(endpoint, user, { responseType: 'text' }).subscribe(
      (response) => {
        let roles = [];

        let jwtDecode = jwt_decode(response);
        roles = jwtDecode['roles'];

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        // Redirigir a home, una vez logeado
        localStorage.setItem(this.ISLOGGEDKEY, 'true');
        this.changeLoginStatusSubject.next(true);
        localStorage.setItem('dietUsernameSession', user.username);
        localStorage.setItem('dietJwtSession', response);

        if (roles.includes('ADMIN')) {
          localStorage.setItem(this.ISADMINKEY, 'true');
          this.changeAdminStatusSubject.next(true);
        }

        this.groupService
          .getAthlete(localStorage.getItem('dietUsernameSession'))
          .subscribe((res) => {
            this.atletaRegister = res;
            if (this.atletaRegister == null) {
              this.route.navigate(['athlete']);
              setTimeout(() => {
                Toast.fire({
                  icon: 'info',
                  title: user.username + ', rellena tus datos.',
                });
              }, 10);
            } else {
              this.route.navigate(['home']);
              setTimeout(() => {
                
                Swal.fire({
                  title: 'Bienvenido a la version Alpha de Diet2Gether',
                  icon:'info',
                  text:'Cualquier error o sugerencia que tenga, no dude en reportarla en la seccion de "Reporte Errores". Gracias por confiar en nosotros.',
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  },
                  confirmButtonText: 'Ok'
                }).then((result) => {

                  Toast.fire({
                    icon: 'success',
                    title: 'Bienvenid@ ' + user.username,
                  });
                })
                
              }, 10);
            }
          });
      },
      (error) => {
        this.route.navigate(['login']);
        Swal.fire({
          title: 'Error',
          text: 'Ha habido un error en la autenticacion.',
          icon: 'error',
        });
      }
    );

    //return this.http.post(endpoint, user,{responseType:'text'});
  }

  logout(): void {
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
    localStorage.removeItem(this.ISADMINKEY);
    this.changeAdminStatusSubject.next(false);

    localStorage.removeItem('dietUsernameSession');
    localStorage.removeItem('dietJwtSession');
    localStorage.removeItem('dietFirstSession');

    this.route.navigate(['welcome']);
  }

  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);

    if (!isLogged) {
      this.urlUsuarioIntentaAcceder = url;

      return false;
    }

    return true;
  }

  isAdmin(url: string) {
    const isAdmin = localStorage.getItem(this.ISADMINKEY);

    if (!isAdmin) {
      this.adminIntentaAcceder = url;
      return false;
    }

    return true;
  }
}
