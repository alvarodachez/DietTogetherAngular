import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-welcome-group',
  templateUrl: './welcome-group.component.html',
  styleUrls: ['./welcome-group.component.scss']
})
export class WelcomeGroupComponent implements OnInit {

  /* Variable que almacena el grupo actual */
  actualGroup: any;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.getActiveGroup();
  }

  /* Método que obtiene el grupo actual */
  getActiveGroup() {
    this.groupService.getActiveGroup().subscribe(res => {
      this.actualGroup = res.actualGroup;
    });
  }


}
