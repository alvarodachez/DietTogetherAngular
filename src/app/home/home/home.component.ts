import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';
import { LogInService } from '../../entry/services/log-in.service';
import { RegimeService } from 'src/app/regime/services/regime.service';
import { DayRegimeInterface } from '../../regime/models/dayRegime.interface';
import { MealRegimeInterface } from '../../regime/models/mealRegimeInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dishNullFlag:boolean = true;
  actualUser: string;
  dateNow: number;
  dayRegime:DayRegimeInterface = {id:null,day:'Holi',meals:[]};

  constructor(private login:LogInService, private regimeService: RegimeService) { }

  ngOnInit(): void {
    
    this.login.isUserInSession();

    this.getActualUser();

    this.getDateNow();

    this.getRegimeDayOfWeek();
  }

  getActualUser() {
    this.actualUser = localStorage.getItem("dietUsernameSession");
  }

  getDateNow() {
    this.dateNow = Date.now();
  }

  getRegimeDayOfWeek(){

    this.regimeService.getDayOfWeekRegime().subscribe(response =>{
      
      this.dayRegime = response;

      if(this.dayRegime.meals!=null){

        let cont = 0;    

        for(let meal of this.dayRegime.meals){

          if(meal.dish == null){
  
            cont ++;

          }

          if(cont == this.dayRegime.meals.length){
            this.dishNullFlag = false;
          }else{
            this.dishNullFlag = true;
          }
        }
      }
    })
  }

  



}
