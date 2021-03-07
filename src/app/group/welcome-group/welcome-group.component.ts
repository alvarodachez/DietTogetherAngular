import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-welcome-group',
  templateUrl: './welcome-group.component.html',
  styleUrls: ['./welcome-group.component.scss']
})
export class WelcomeGroupComponent implements OnInit {

  actualGroup: any;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.getActiveGroup();
  }

  getActiveGroup() {
    console.log("get active group");
    
    this.groupService.getActiveGroup().subscribe(res => {
      // console.log(res.actualGroup);
      this.actualGroup = res.actualGroup;
      console.log(this.actualGroup);
    });
  }


}
