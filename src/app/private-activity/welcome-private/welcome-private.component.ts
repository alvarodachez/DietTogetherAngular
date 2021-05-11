import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/entry/services/log-in.service';
import { PrivateService } from '../services/private.service';

@Component({
  selector: 'app-welcome-private',
  templateUrl: './welcome-private.component.html',
  styleUrls: ['./welcome-private.component.scss']
})
export class WelcomePrivateComponent implements OnInit {

  /* Variable que almacena la actividad privada actual */
  actualPrivateActivity: any;

  /* Variable que almacena el grupo actual */
  actualGroup: any;


  constructor(private privateService: PrivateService, private login:LogInService) { }

  ngOnInit(): void {
    this.login.isUserInSession();
    this.getActivePrivateActivity();
    this.getActiveGroup();
  }

  /* Método que obtiene la actividad privada actual */
  getActivePrivateActivity() {
    this.login.isUserInSession();
    this.privateService.getPrivateActivity().subscribe(res => {
      this.actualPrivateActivity = res;
    });
  }

  /* Método que obtiene el grupo actual */
  getActiveGroup() {
    this.login.isUserInSession();
    this.privateService.getActiveGroup().subscribe(res => {
      this.actualGroup = res.actualGroup;
    });
  }

}
