import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, urlServer } from 'src/environments/environment';
import { urlServerProd } from 'src/environments/environment.prod';
import { DishInterface } from '../models/dish.interface';
import { Observable } from 'rxjs';
import { DayRegimeInterface } from '../models/dayRegime.interface';
import { LogInService } from '../../entry/services/log-in.service';

@Injectable({
  providedIn: 'root',
})
export class RegimeService {
  endPointServer = '';

  constructor(private http: HttpClient, private login:LogInService) {
    if (!environment.production) {
      this.endPointServer = urlServer.url;
    } else {
      this.endPointServer = urlServerProd.url;
    }
  }

  getDishesByInitials(initials: string): Observable<any> {
    this.login.isUserInSession();

    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem("dietJwtSession");

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/regime/get-dishes-initials/${username}&&${initials}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${jwt}` }),
    };

    /* obtiene los usuarios, buscando por las iniciales introducidas */
    return this.http.get(endpoint, httpOptions);
  }

  /**
   * Creamos un plato y se lo añadimos al usuario
   * @param dish
   * @returns
   */
  createDish(dish: DishInterface): Observable<any> {
    this.login.isUserInSession();
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/regime/create-dish/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    /* crear grupo con los datos finales para el backend */
    return this.http.post(endpoint, dish, httpOptions);
  }

  /**
   * Obtenemos los platos del usuario
   * @returns
   */
  getDishesByUsername(): Observable<DishInterface[]> {
    this.login.isUserInSession();
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint = this.endPointServer + `/regime/get-dishes/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    return this.http.get<DishInterface[]>(endpoint, httpOptions);
  }

  /**
   * Crear la estructura de la dieta del usuario, si aun no ha creado ninguna
   * @returns
   */
  createRegimeStructure(): Observable<any> {
    this.login.isUserInSession();
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer + `/regime/create-regime-structure/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    return this.http.post(endpoint, 'holi', httpOptions);
  }

  /**
   * Añadir plato a la comida
   * @param meal 
   * @param dish 
   * @returns 
   */
  addDishToDay(meal:any,dish:any): Observable<any> {
    this.login.isUserInSession();
    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer + `/regime/add-dish-day/${username}&&${meal}&&${dish}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    return this.http.post(endpoint,"holi",httpOptions);
  }

  getDayRegime():Observable<DayRegimeInterface[]>{
    this.login.isUserInSession();

    const username = localStorage.getItem('dietUsernameSession');

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer + `/regime/get-day-regime/${username}`;

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    return this.http.get<DayRegimeInterface[]>(endpoint,httpOptions);
  }

  getMealCategories():Observable<any>{
    this.login.isUserInSession();

    /* Obtener token JWT del usuario actual */
    const jwt = localStorage.getItem('dietJwtSession');

    /* Dirección del servidor - petición */
    const endpoint =
      this.endPointServer + "/regime/get-meal-catetgories";

    /* Cabecera necesaria para indicar token JWT */
    let httpOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${jwt}` }),
    };

    return this.http.get(endpoint,httpOptions);
  }
}
