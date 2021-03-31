import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';
import { LogInService } from '../../entry/services/log-in.service';
import { RegimeService } from 'src/app/regime/services/regime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  actualUser: string;
  dateNow: number;

  constructor(private login:LogInService, private regimeService: RegimeService) { }

  ngOnInit(): void {
    this.login.isUserInSession();

    this.getActualUser();

    this.getDateNow();
  }

  getActualUser() {
    this.actualUser = localStorage.getItem("dietUsernameSession");
  }

  getDateNow() {
    this.dateNow = Date.now();
  }

  



}
