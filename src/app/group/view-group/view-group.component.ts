import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { AthleteRankingInterface } from '../models/athlete-ranking.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {
  showActive: boolean;

  actualGroup: any;
  athletes: any = [];
  actualPage: number = 1;

  nextRegisterDate:any;

  isRegisterActive:boolean = true;

  progressBar: any;

  registers: any;

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

  constructor(private groupService: GroupService) {
    this.actualGroup = "hola";
    this.registers = "holi";
    this.progressBar = "buenas";
  }

  ngOnInit(): void {
    this.showActive = true;
    this.getActualGroup();
    this.getRegisters();
    this.getProgressBar();
    
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

  getActualGroup() {
    this.groupService.getActiveGroup().subscribe(response => {

      console.log(response.actualGroup);

      this.actualGroup = response.actualGroup;

      this.actualGroup.athletes.forEach(athlete => {

        this.groupService.getAthlete(athlete).subscribe(res => {
          let athleteRanking: AthleteRankingInterface = {
            name: res.name,
            point: res.gamePoints

          }

          this.athletes.push(athleteRanking);

          if (this.athletes.length > 1) {

            this.athletes = this.athletes.sort((a: AthleteRankingInterface, b: AthleteRankingInterface) => {

              console.log("holi")
              if (a.point < b.point) {
                return 1;
              }

              if (a.point > b.point) {
                return -1;
              }

              return 0;
            })
          }

          /* console.log(athleteRanking); */
        })

      })


    })
  }

  getRegisters() {
    console.log("gol de cristiano")
    this.groupService.getRegisters().subscribe(response => {


      if (response[0] == null) {
        this.registers = [];
      } else {
        this.registers = response;

        if (this.registers.length > 1) {

          this.registers = this.athletes.sort((a, b) => new Date(a.weightDate) < new Date(b.weightDate));
        }


      }
      this.setNextRegisterDate();
      console.log(this.registers);
    }, error => {
      console.log(error);
    })
  }

  crearRegistro() {

    

    const registro = {
      "weight": parseFloat(
        this.addRegisterForm.value.weightKilograms + '.' + this.addRegisterForm.value.weightGrams)
    }

    this.groupService.createRegister(registro).subscribe(response => {
      console.log(response);
      this.getRegisters();
      this.athletes = [];
      this.getActualGroup();
    })
  }

  getProgressBar() {
    this.groupService.getProgressBar().subscribe(response => {
      console.log(response);
      this.progressBar = response;
    })
  }

  setNextRegisterDate(){

    
    console.log("gola")
    if(this.registers.length >= 1){

      this.nextRegisterDate = this.registers[0].nextDateRegister;

      if(new Date(Date.now()) > new Date(Date.parse(this.nextRegisterDate))){
        this.isRegisterActive = true;
      }else{
        this.isRegisterActive = false;
      }
    }
  }

}
