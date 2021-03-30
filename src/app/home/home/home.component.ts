import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';
import { LogInService } from '../../entry/services/log-in.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private login:LogInService) { }

  ngOnInit(): void {
    this.login.isUserInSession();
  }




}
