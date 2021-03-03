import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  addRegisterForm = new FormGroup({
    weightKilograms: new FormControl('', [
      Validators.required,            // requerido
      Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
      Validators.minLength(1),        // número mínimo de caracteres, 1
      Validators.maxLength(3),        // número máximo de caracteres, 3
      Validators.min(1),              // valor mínimo, 1
      Validators.max(300),            // valor máximo, 300
    ]),
    weightGrams: new FormControl('', [
      Validators.required,            // requerido
      Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
      Validators.minLength(1),        // número mínimo de caracteres, 1
      Validators.maxLength(3),        // número máximo de caracteres, 3
    ]),
  });
  
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


  resetAddRegisterForm() {
    this.addRegisterForm.reset();
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
