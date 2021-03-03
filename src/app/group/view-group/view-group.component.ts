import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {
  showActive: boolean;

  actualGroup:any;
  athletes:any = [];
  
  constructor(private groupService:GroupService) { 
    this.actualGroup = "hola";
  }

  ngOnInit(): void {
    this.showActive = true;
    this.getActualGroup();
  }

  changeRanking() {
    this.showActive = true;
  }

  changeRegisters() {
    this.showActive = false;
  }

  getActualGroup(){
    this.groupService.getActiveGroup().subscribe(response => {

      console.log(response.actualGroup);

      this.actualGroup = response.actualGroup;

      this.actualGroup.athletes.forEach(athlete =>{

        this.groupService.getAthlete(athlete).subscribe(res =>{
          let athleteRanking = {
            'name':athlete,
            'point':res.gamePoints

          }

          this.athletes.push(athleteRanking);

          console.log(athleteRanking);
        })

      })

      this.athletes.sort(function(a,b){
        return a.point - b.point;
      })
    })
  }

}
