import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogInService } from 'src/app/entry/services/log-in.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

  /* Variable que almacena el atleta actual */
  actualAthlete: any;

  athleteName: any = '';
  athleteSurname: any = '';
  athleteBirthday: any = '';
  athleteTotalPoints: any = -1;
  athleteIMC: any = '';
  athleteScale: any = '';

  profileForm = new FormGroup({
    name: new FormControl({value: '', disabled: true}, Validators.required),
    surname: new FormControl({value: '', disabled: true}, Validators.required),
    birthDay: new FormControl({value: '', disabled: true}, Validators.required),
    // gamePoints: new FormControl({value: '', disabled: true}, Validators.required),  // game_points
    totalPoints: new FormControl({value: '', disabled: true}, Validators.required),    // total_points
    // total_weight_difference: new FormControl({value: '', disabled: true}, Validators.required),
  });

  constructor(private profileService: ProfileService, private login:LogInService) {}

  ngOnInit(): void {
    this.login.isUserInSession();
    this.getActualAthlete();
  }

  /* Método que obtiene el atleta actual */
  getActualAthlete() {
    this.login.isUserInSession();
    this.profileService.getAthlete().subscribe(res => {
      
      this.actualAthlete = res;

      this.athleteName = res.name;
      this.athleteSurname = res.surname;
      this.athleteBirthday = res.birthDay;
      this.athleteTotalPoints = res.totalPoints;
      this.athleteIMC = res.physicalData.imc.imcValue;
      this.athleteScale = res.physicalData.imc.actualScale;

      console.log(this.athleteScale);

      console.log(this.actualAthlete);
    });
  }

  sendProfileData() {}

}
