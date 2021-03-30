import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { LogInService } from '../../entry/services/log-in.service';

@Component({
  selector: 'app-welcome-group',
  templateUrl: './welcome-group.component.html',
  styleUrls: ['./welcome-group.component.scss']
})
export class WelcomeGroupComponent implements OnInit {

  /* Variable que almacena el grupo actual */
  actualGroup: any;

  constructor(private groupService: GroupService, private login:LogInService) { }

  ngOnInit(): void {
    this.login.isUserInSession();
    this.getActiveGroup();
  }

  /* Método que obtiene el grupo actual */
  getActiveGroup() {
    this.login.isUserInSession();
    this.groupService.getActiveGroup().subscribe(res => {
      this.actualGroup = res.actualGroup;
    });
  }


}
